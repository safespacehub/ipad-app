# iPad Todo App

A beautiful, iPad-optimized Todo application built with React, TypeScript, and Vite. Can be used as a web app (PWA) or converted to a native iOS app using Capacitor.

## Features

- ✅ Add, edit, delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos (all, active, completed)
- ✅ Clear completed todos
- ✅ Local storage persistence
- ✅ iPad-optimized touch interactions
- ✅ PWA support (can be installed on home screen)
- ✅ Native iOS app support via Capacitor

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Capacitor** for native iOS conversion
- **CSS** with modern features and iPad optimization

## Getting Started

### Prerequisites

- Node.js 20+ (22+ recommended for Capacitor CLI)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

Build the web app:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Using as a Web App (PWA)

1. Build the app: `npm run build`
2. Serve the `dist` directory using any static file server
3. Open in Safari on iPad
4. Tap the Share button and select "Add to Home Screen"
5. The app will launch in standalone mode, feeling like a native app

## Converting to Native iOS App

Since this project is set up on Linux without macOS access, you'll need to use cloud build services to compile the iOS app.

### Option 1: EAS Build (Recommended)

[EAS Build](https://expo.dev/build) by Expo provides free cloud builds for iOS apps.

1. **Install EAS CLI** (requires Node 18+):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure the project**:
   ```bash
   eas build:configure
   ```

4. **Build for iOS**:
   ```bash
   # First, build the web app
   npm run build
   
   # Sync Capacitor
   npm run cap:sync
   
   # Build iOS app in the cloud
   eas build --platform ios
   ```

5. **Download and install** the `.ipa` file on your iPad

### Option 2: Codemagic

[Codemagic](https://codemagic.io/) offers free builds for open source projects.

1. Sign up at codemagic.io
2. Connect your GitHub repository
3. Create a `codemagic.yaml` configuration file (see example below)
4. Trigger builds from the Codemagic dashboard

### Option 3: GitHub Actions with macOS Runner

For public repositories, GitHub Actions provides free macOS runners.

1. Create `.github/workflows/ios-build.yml` (see example below)
2. Push to GitHub
3. The workflow will build the iOS app automatically

### Option 4: Remote macOS Service

If you need full Xcode access:

1. Rent a cloud Mac from [MacStadium](https://www.macstadium.com/) or [MacinCloud](https://www.macincloud.com/)
2. Access via VNC or SSH
3. Install Xcode and build normally:
   ```bash
   npm run build
   npm run cap:sync
   npm run cap:ios
   ```

## Project Structure

```
/home/turbo/ipad-app/
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service worker
│   └── icons/             # App icons
├── src/
│   ├── components/        # React components
│   │   ├── TodoInput.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoFilters.tsx
│   ├── hooks/
│   │   └── useTodos.ts    # Todo state management
│   ├── types/
│   │   └── todo.ts        # TypeScript types
│   ├── App.tsx            # Main app component
│   ├── App.css            # App styles
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── capacitor.config.ts     # Capacitor configuration
├── vite.config.ts         # Vite configuration
└── package.json
```

## Capacitor Configuration

The app is configured with:
- **App ID**: `com.todoapp.ipad`
- **App Name**: `Todo App`
- **Web Directory**: `dist`

You can modify these in `capacitor.config.ts`.

## Building iOS App Locally (requires macOS)

If you have access to macOS:

```bash
# Build the web app
npm run build

# Sync Capacitor (copies web assets to native project)
npm run cap:sync

# Open in Xcode
npm run cap:ios
```

Then build and run from Xcode.

## App Store Submission

To submit to the App Store:

1. Build the iOS app using one of the cloud services above
2. Download the `.ipa` file
3. Use [Transporter](https://apps.apple.com/us/app/transporter/id1450874784) or Xcode to upload to App Store Connect
4. Complete the app listing in App Store Connect
5. Submit for review

## Development Notes

- The app uses `localStorage` for persistence, which works in both web and native contexts
- Touch targets are minimum 44x44px for iPad accessibility
- The app is optimized for portrait orientation but works in landscape
- Service worker provides offline functionality for the web version

## License

MIT
