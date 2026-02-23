# syntax=docker/dockerfile:1

# ──────────────────────────────────────────────────────────
# Stage 1 – Install dependencies (separate for cache reuse)
# ──────────────────────────────────────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --no-audit --prefer-offline

# ──────────────────────────────────────────────────────────
# Stage 2 – Build the Nuxt application
# ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ──────────────────────────────────────────────────────────
# Stage 3 – Pre-compress public static assets
#
# Only public/ is compressed here; server/ files are served
# by Node.js directly and gain nothing from pre-compression.
#
# NOTE: heredoc is used so inline comments don't get merged
# into a single shell line and accidentally comment out code.
# ──────────────────────────────────────────────────────────

# run this to run app with pre-compressed assets (for static/CDN deployment):
# docker build --target statics -t nuxt4-app:static .
# docker run -p 80:80 nuxt4-app:static
#

FROM alpine:3.20 AS compressor

RUN apk add --no-cache brotli zstd gzip

WORKDIR /public
COPY --from=builder /app/.output/public ./

RUN <<'EOF'
set -e
find . -type f \( \
  -name "*.html" -o -name "*.css"  -o -name "*.js"   -o \
  -name "*.mjs"  -o -name "*.svg"  -o -name "*.json" -o \
  -name "*.xml"  -o -name "*.txt"  -o -name "*.map"  \
\) | while read -r file; do
  # Brotli – maximum quality (best ratio for text)
  brotli -q 11 -f -o "${file}.br"  "$file"
  # Zstandard – level 15 (good ratio, much faster than 19)
  zstd   -15  -q -f -o "${file}.zst" "$file"
  # Gzip – best compression (universal fallback)
  gzip   -k -9 -f "$file"
done
EOF

# ──────────────────────────────────────────────────────────
# Stage 4 – Static image (Angie serves pre-compressed assets)
#
# Use this target when deploying as a static/CDN-fronted app:
#   docker build --target statics -t myapp:static .
# ──────────────────────────────────────────────────────────
# run this to run app with pre-compressed assets (for static/CDN deployment):
#  docker build --target statics -t nuxt4-app:static .
# docker run -p 80:80 nuxt4-app:static
FROM docker.angie.software/angie:latest AS statics

# Only copy public assets – server/ is irrelevant for Angie
COPY --from=compressor /public /usr/share/angie/html

COPY ./ange.dev.conf /etc/angie/angie.conf

EXPOSE 80

CMD ["angie", "-g", "daemon off;"]

# ──────────────────────────────────────────────────────────
# Stage 5 – SSR server (Node.js)
#
# Default build target. Runs the Nuxt Nitro SSR server.
# For production with an Angie reverse-proxy in front,
# use angie.ssr.conf in the proxy container / compose service.
# ──────────────────────────────────────────────────────────
FROM node:22-alpine AS app

# Non-root user for security
RUN addgroup -g 1001 nuxt && adduser -u 1001 -G nuxt -s /bin/sh -D nuxt

WORKDIR /app

# Copy clean .output from builder – no .br/.gz/.zst bloat here
COPY --from=builder /app/.output ./

USER nuxt

ENV NODE_ENV=production
ENV NITRO_PRESET=node-server
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server/index.mjs"]
