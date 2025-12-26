# Quick Start Guide

## Running the Web App

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**: Navigate to `http://localhost:5173`

4. **Test on iPad**: 
   - Make sure your iPad and computer are on the same network
   - Find your computer's IP address: `hostname -I` (Linux) or `ipconfig getifaddr en0` (Mac)
   - On iPad Safari, go to `http://YOUR_IP:5173`
   - Tap Share → Add to Home Screen

## Building for Production

```bash
npm run build
```

The built files are in the `dist/` directory. Serve them with any static file server:

```bash
# Using Python
cd dist && python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server dist -p 8000

# Using nginx, Apache, or any web server
```

## Converting to Native iOS App

### Prerequisites
- Node.js 22+ (for Capacitor CLI)
- Apple Developer account (for App Store submission)

### Using EAS Build (Recommended)

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login**:
   ```bash
   eas login
   ```

3. **Build web app**:
   ```bash
   npm run build
   ```

4. **Initialize Capacitor** (if not done):
   ```bash
   npx cap init
   ```

5. **Add iOS platform**:
   ```bash
   npx cap add ios
   ```

6. **Sync Capacitor**:
   ```bash
   npx cap sync
   ```

7. **Build iOS app**:
   ```bash
   eas build --platform ios
   ```

8. **Download and install** the `.ipa` file on your iPad

### Using GitHub Actions

1. Push your code to GitHub
2. The workflow in `.github/workflows/ios-build.yml` will automatically build
3. Download the `.ipa` artifact from the Actions tab

### Using Codemagic

1. Sign up at codemagic.io
2. Connect your GitHub repository
3. The `codemagic.yaml` file is already configured
4. Trigger a build from the dashboard

## Notes

- **Node Version**: The project works with Node 18+, but Capacitor CLI requires Node 22+
- **Icons**: Replace placeholder icons in `public/icons/` with your own designs
- **App ID**: Change `com.todoapp.ipad` in `capacitor.config.ts` to your own bundle ID
- **Testing**: Use browser dev tools with iPad user agent to test the UI

## Troubleshooting

**Build fails with TypeScript errors**: Make sure you're using the correct import syntax for types (use `import type`)

**Service worker not working**: Make sure you're serving over HTTPS or localhost (service workers require secure context)

**Capacitor sync fails**: Make sure you have Node 22+ installed, or use cloud build services

