
// Polyfills for web compatibility

// Add any necessary polyfills here
if (typeof window !== 'undefined') {
  // Polyfill for requestAnimationFrame
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 1000 / 60);
    };
  }

  // Polyfill for cancelAnimationFrame
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  // Add console.log for debugging
  console.log('🌐 Web polyfills loaded');
}
