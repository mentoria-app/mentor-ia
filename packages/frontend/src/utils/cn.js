/**
 * Utility function to merge CSS class names
 * Filters out falsy values and joins the remaining classes
 * @param {...string} classes - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
} 