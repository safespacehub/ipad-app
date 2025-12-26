# App Icons

This directory should contain the app icons for PWA and native iOS app.

## Required Icons

- `icon-192.png` - 192x192 pixels (PWA)
- `icon-512.png` - 512x512 pixels (PWA)
- `icon-1024.png` - 1024x1024 pixels (iOS App Store)

## Creating Icons

You can create icons using:

1. **Online tools**:
   - [App Icon Generator](https://www.appicon.co/)
   - [IconKitchen](https://icon.kitchen/)
   - [MakeAppIcon](https://makeappicon.com/)

2. **Design tools**:
   - Figma
   - Sketch
   - Adobe Illustrator/Photoshop

3. **Command line** (if you have ImageMagick):
   ```bash
   # Create a simple icon from an SVG or existing image
   convert input.png -resize 192x192 icon-192.png
   convert input.png -resize 512x512 icon-512.png
   convert input.png -resize 1024x1024 icon-1024.png
   ```

## Icon Design Guidelines

- Use a simple, recognizable design
- Ensure the icon looks good at small sizes
- Use high contrast for visibility
- Follow iOS Human Interface Guidelines
- Test on actual device

## Temporary Placeholder

For development, you can use the Vite logo or create a simple colored square as a placeholder.

