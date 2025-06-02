const imageEffects = {
  // Configurable variables
  zoomScale: 1.25, // 25% zoom
  previewPanDuration: 2100, // 30% faster than 3000ms
  previewPanDirection: 'top', // Options: 'top', 'bottom', 'left', 'right'

  // Initialize preview effect on an image element
  initPreviewEffect(element) {
    if (!element) return;
    this.applyZoomAndPan(element, this.previewPanDirection, this.previewPanDuration, false);
  },

  // Apply zoom and pan effect
  applyZoomAndPan(element, direction, duration, instantZoom = false) {
    if (!element) return;

    // Reset any existing animations
    element.style.transition = '';
    element.style.transform = '';

    // Apply zoom
    element.style.transition = `transform ${duration}ms ease-in-out`;
    element.style.transform = `scale(${this.zoomScale})`;

    // Calculate pan distance based on direction
    let translateX = 0;
    let translateY = 0;
    
    if (direction === 'left') {
      translateX = -((element.offsetWidth * this.zoomScale - element.offsetWidth) / 2);
    } else if (direction === 'right') {
      translateX = ((element.offsetWidth * this.zoomScale - element.offsetWidth) / 2);
    } else if (direction === 'top') {
      translateY = -((element.offsetHeight * this.zoomScale - element.offsetHeight) / 2);
    } else if (direction === 'bottom') {
      translateY = ((element.offsetHeight * this.zoomScale - element.offsetHeight) / 2);
    }

    // Apply pan animation
    setTimeout(() => {
      element.style.transition = `transform ${duration}ms ease-in-out`;
      element.style.transform = `scale(${this.zoomScale}) translate(${translateX}px, ${translateY}px)`;
    }, instantZoom ? 0 : 100);
  },

  // Reset effect to original state
  resetEffect(element) {
    if (!element) return;
    element.style.transition = `transform 300ms ease-in-out`;
    element.style.transform = 'scale(1) translate(0, 0)';
  }
};

// Export for use in React
export default imageEffects;