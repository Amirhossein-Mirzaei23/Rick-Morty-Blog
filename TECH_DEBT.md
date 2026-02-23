# Technical Debt Register

## TD-001 - Poor Text Contrast on Character Info Card

- **Type:** UI / Accessibility
- **Impact:** High
- **Description:**
  The text color of label on the Character Info Card does not have sufficient contrast
  ratio against the background color, which reduces readability and
  fails WCAG accessibility standards.
- **Affected Users:**
  - Users with visual impairments
  - Users in bright light environments
- **Steps to Reproduce:**
  1. Open any character page
  2. View the character info card
  3. Run Lighthouse and check accebilty section issues
- **Proposed Fix:**
  - Use a contrast checker tool (e.g. [WebAIM](https://webaim.org/resources/contrastchecker/))
  - Update text or background color to meet **4.5:1** contrast ratio
  - Consider using CSS variables for consistent theming
- **Effort:** Low (1-2 hours)
- **Priority:** High
- **Owner:** Unassigned
- **Date Added:** 2026-02-23
