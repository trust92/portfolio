## Overview

**Portfolio App** is a Next.js-based web application designed for viewing and interacting with image in a responsive, mobile-optimized gallery interface.

### Key Features
- **Image Gallery**:
  - Displays images fetched from `/api/gallery` with infinite scrolling.
  - Supports image popups with left/right navigation and swipe-to-close functionality.
  - Optimized image loading
- **Responsive Design**:
  - Optimized for mobile screens with a flexible grid layout.
  - Uses CSS custom properties for dynamic column widths and styling, adjustable via a future settings component.
- **Styling**:
  - Uses the `OCR-A` font for a consistent, retro aesthetic.
  - Zoom-in animations on card hovers, with images and videos contained to their original sizes.
  - No shadows on thumbnails for a clean look.
- **Performance**:
  - Implements lazy loading and IntersectionObserver for efficient content loading.
  - Cleans up preview URLs to prevent memory leaks.
  - Uses Next.js Image component for optimized image loading.

## Prerequisites

- **Node.js**: Version 18.x or higher.
- **npm**: Version 8.x or higher.
- **Git**: For cloning the repository.
- **Browser**: Modern browsers (Chrome, Firefox, Safari, Edge) for optimal performance.
- **Font File**: Ensure `OCR-A.ttf` is placed in the `/public` folder for styling.

## Framework & Packages
- **next.js**: api/server
- **react typescript**: front end
- **shadcn-ui**: ui
- **radix-ui**: ui
- **tailwind-css**: css

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/trust92/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This installs required packages, including:
   - `next`, `react`, `react-dom` for the Next.js framework.
   - `framer-motion` for animations.
   - `react-swipeable` for swipe gestures.
   - `tailwindcss` for utility-first CSS.

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Access the app at `http://localhost:3000` (or `http://10.0.0.75:3000` for network access).
   - Alternatively, run `python -m http.server` to serve on `http://localhost:8000` + `--bind 0.0.0.0` (optional)
   - Follow security protocols for production deployment.





### Image Gallery (`/`)
- The Image Gallery displays a grid of images

#### Features
- **Grid Layout**: Images are displayed in a responsive grid with a default column width (customizable via `--gallery-column-width-gallery`).
- **Infinite Scrolling**: Loads 16 images per page, with more loaded as you scroll.
- **Lazy Loading**: Optimized image loading
- **Image Popup**:
  - Click an image to open a full-screen popup.
  - Navigate to previous/next images using buttons or swipe left/right.
  - Close the popup by clicking "Close"
- **No Shadows**: Thumbnails have no shadows for a clean look.
- **Zoom Animation**: Cards zoom in slightly on elevation.

#### How to Use
1. Visit `http://localhost:3000/`.
2. Scroll down to load more images (16 per page).
3. Click an image to open a full-screen popup.
4. Use navigation buttons or swipe left/right to browse images.
5. Swipe up/down or click "Close" to exit the popup.

### Styling Customization
The app uses CSS custom properties in `globals.css` for dynamic styling. To customize styles (e.g., column widths), you can:
- Override variables in a settings component (TBD) using inline styles, e.g.:
  ```tsx
  <div className="gallery-grid" style={{ "--gallery-column-width": "250px" }}>
  ```
- Modify defaults in `globals.css`:
  ```css
  :root {
    --gallery-column-width: 250px; /* Videos */
    --gallery-column-width-gallery: 350px; /* Gallery */
  }
  ```

## Technical Details

### Dependencies
- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: For building interactive UI components.
- **Framer Motion**: For animations (e.g., card transitions, zoom-in effects).
- **React Swipeable**: For swipe gestures in popups.
- **Lodash**: For debouncing hover events.
- **Tailwind CSS**: For utility-first styling.

### Styling
- **Font**: Uses `OCR-A` (served from `/public/OCR-A.ttf`) for all text.
- **Layout**: Responsive grid with dynamic column widths (`--gallery-column-width`, `--gallery-column-width-gallery`).
- **Animations**:
  - Cards fade in on load and zoom in on hover (scale to 1.05).
  - Video previews pulse with brightness animation.
- **Metadata (Videos)**: Displays name, file type, duration, and tags in bubbles on hover.
- **No Shadows**: Thumbnails have no shadows for a clean appearance.
- **Popup**: Full-screen media viewer with navigation controls and swipe gestures.

### Performance Optimizations
- **Lazy Loading**: Images and videos load lazily after the initial set (20 for Videos, 10 for Gallery).
- **Priority Loading**: First 4 items in both galleries load with priority.
- **IntersectionObserver**: Triggers infinite scrolling efficiently.
- **URL Cleanup**: Revokes preview URLs to prevent memory leaks.
- **Next.js Image**: Optimizes image loading with compression and responsive sizes.

## Troubleshooting

### Common Issues
1. **Videos/Images Not Loading**:
   - Verify files exist in `/public/videos`, `/public/thumbnails/preview`, or `/public/images`.
   - Check API responses for correct `url`, `thumbnail`, and `preview` paths.
   - Ensure CORS is configured if assets are served from a different domain.
2. **Font Not Loading**:
   - Confirm `OCR-A.ttf` is in `/public/OCR-A.ttf`.
   - Check browser console for 404 errors on font loading.
3. **Infinite Scroll Not Working**:
   - Ensure `load-more` div is present and visible.
   - Check `IntersectionObserver` logs in the console.
4. **Swipe Gestures Not Working**:
   - Verify `react-swipeable` is installed (`npm install react-swipeable`).
   - Test on a touch-enabled device or browser emulator.
5. **Styling Issues**:
   - Check `globals.css` for correct CSS variable values.
   - Ensure Tailwind CSS is properly integrated (`@import "tailwindcss"`).

### Debugging
- Open browser DevTools (F12) and check the **Network** tab for failed requests.
- Review the **Console** for errors (e.g., API failures, image/video load errors).
- Enable logging in `lib/logger.ts` for detailed debug output.

## Development

### Running in Development
```bash
npm run dev
```
- Access at `http://localhost:3000` or `http://10.0.0.75:3000` for network access.
- Use `--hostname 0.0.0.0` to allow external access:
  ```bash
  npm run dev -- --hostname 0.0.0.0
  ```

### Building for Production
```bash
npm run build
npm run start
```
- Ensure all static assets are in `/public`.
- Verify API endpoints are accessible in production.
- Running npm build will run the tagging script to generate thumbnail assets

### Customizing Styles
- Edit `globals.css` to adjust CSS variables (e.g., `--gallery-column-width`).
- Implement a settings component to pass dynamic props, e.g.:
  ```tsx
  function Settings({ onColumnWidthChange }) {
    return (
      <input
        type="range"
        min="100"
        max="500"
        onChange={(e) => onColumnWidthChange(`${e.target.value}px`)}
      />
    );
  }
  ```

## Future Improvements
- **Settings Component**: Add a UI to adjust column widths and other styles dynamically.
- **Tag Management**: Implement tag filtering UI for the Image Gallery.
- **Error Handling**: Enhance error messages for failed API requests or asset loading.
- **Accessibility**: Add ARIA labels and keyboard navigation for improved accessibility.
- **Performance**: Optimize video previews with lower resolution or shorter clips.
- **Interface**: Optimize JSON viewer, readability, transitions, animations, etc
- **Tagging**: Optimize tagging scripts to use transformers, WD-tagging or BLIP caption description or manual captioning automation
- **Paths**: Change paths to an INI file rather than using env variables
- **Middleware**: Expand support for SSL and session management
- **Pages**: Create landing page and move gallery to /gallery

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For support or contributions open an issue on the [GitHub repository](https://github.com/datadrip-ai/portfolio).
