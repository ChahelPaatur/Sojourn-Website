# SoJourn - AI-Powered Travel Companion

A modern, performant web application for AI-driven travel planning, built with Next.js, React, and Framer Motion.

## Features

- 🌍 Interactive 3D globe and map visualization
- 🤖 AI-powered travel recommendations
- 📍 Real-time route planning with Apple Maps integration
- 📱 Responsive design with beautiful animations
- 🎨 Modern UI with glass morphism effects
- 🔄 Smooth transitions and loading states

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Maps:** Apple MapKit JS
- **3D Rendering:** Three.js with React Three Fiber
- **State Management:** React Hooks
- **Performance Optimizations:**
  - Dynamic imports for code splitting
  - Lazy loading of heavy components
  - Image optimization with next/image
  - Efficient animations with GPU acceleration
  - Debounced event handlers
  - Memoized components where beneficial

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sojourn-website.git
   cd sojourn-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your Apple MapKit JS token to `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Performance Optimizations

### Code Splitting
- Components are dynamically imported to reduce initial bundle size
- Heavy libraries (Three.js, MapKit) are loaded on demand

### Image Optimization
- Images are lazy loaded with blur placeholders
- Team member photos are optimized and served in modern formats
- SVG icons are used for better scaling and performance

### Animation Performance
- CSS transforms are used instead of layout properties
- Hardware acceleration enabled for smooth animations
- Reduced motion support for accessibility

### Loading States
- Custom loading animations for better UX
- Placeholder content during data fetching
- Progressive enhancement approach

### Caching
- Static assets are cached with appropriate headers
- API responses are cached where appropriate
- Persistent data is stored in localStorage

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from Apple's UI guidelines
- Map data provided by Apple Maps
- 3D globe visualization inspired by ThreeJS examples
