/**
 * GET /api/health
 * Simple health check endpoint.
 */
export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }
})
