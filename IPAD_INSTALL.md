# Installing on iPad Mini

There are several ways to get the app on your iPad Mini. Here are the options from easiest to most advanced:

## Option 1: Web App (PWA) - Easiest ⭐

This lets you install the app directly on your iPad without any build process.

### Step 1: Build the App
```bash
npm run build
```

### Step 2: Serve the App

You need to make the app accessible to your iPad. Choose one method:

#### Method A: Local Network (Same WiFi)

1. **Find your computer's IP address**:
   ```bash
   hostname -I
   # Or
   ip addr show | grep "inet " | grep -v 127.0.0.1
   ```
   You'll get something like `192.168.1.100`

2. **Start a local server**:
   ```bash
   cd dist
   python3 -m http.server 8000
   ```
   Or using Node.js:
   ```bash
   npx http-server dist -p 8000
   ```

3. **On your iPad Mini**:
   - Make sure iPad and computer are on the same WiFi network
   - Open Safari
   - Go to `http://YOUR_IP:8000` (e.g., `http://192.168.1.100:8000`)
   - Tap the Share button (square with arrow)
   - Select "Add to Home Screen"
   - Tap "Add"

4. **Done!** The app icon will appear on your home screen and launch in fullscreen mode.

#### Method B: Deploy to a Web Host

1. **Deploy to a free hosting service**:
   - [Netlify](https://www.netlify.com/) - Drag and drop the `dist` folder
   - [Vercel](https://vercel.com/) - Connect GitHub repo
   - [GitHub Pages](https://pages.github.com/) - Free for public repos
   - [Cloudflare Pages](https://pages.cloudflare.com/) - Free tier

2. **Access from iPad**:
   - Open Safari on iPad
   - Go to your deployed URL
   - Tap Share → Add to Home Screen

#### Method C: USB/File Transfer (Advanced)

1. **Copy files to iPad**:
   - Use Files app with cloud storage (iCloud, Dropbox, etc.)
   - Or use a file server app

2. **Open in Safari**:
   - Navigate to the `index.html` file
   - Add to Home Screen

## Option 2: Native iOS App via Cloud Build

This creates a real iOS app (.ipa file) that you can install.

### Using EAS Build (Recommended)

1. **Install EAS CLI** (requires Node 22+):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Build the web app first**:
   ```bash
   npm run build
   ```

4. **Initialize Capacitor** (if not done):
   ```bash
   # You may need Node 22+ for this
   npx cap init
   npx cap add ios
   npx cap sync
   ```

5. **Build iOS app**:
   ```bash
   eas build --platform ios --profile development
   ```

6. **Install on iPad**:
   - Download the `.ipa` file from EAS
   - Use [AltStore](https://altstore.io/) or [Sideloadly](https://sideloadly.io/) to install
   - Or use TestFlight if you have an Apple Developer account

### Using GitHub Actions

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Trigger the workflow**:
   - Go to GitHub Actions tab
   - The workflow will build automatically
   - Download the `.ipa` artifact

3. **Install on iPad** (same as EAS Build step 6)

## Option 3: Development Server (For Testing)

If you just want to test during development:

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Find your IP**:
   ```bash
   hostname -I
   ```

3. **On iPad Safari**:
   - Go to `http://YOUR_IP:5173`
   - The app will work, but won't be installable as PWA in dev mode

## Troubleshooting

### "Cannot connect to server"
- Make sure both devices are on the same WiFi network
- Check firewall settings on your computer
- Try disabling VPN if active
- Make sure the server is running

### "Add to Home Screen" not working
- Make sure you're using Safari (not Chrome)
- The app must be served over HTTP/HTTPS (not file://)
- Check that `manifest.json` is accessible

### App doesn't work offline
- Make sure service worker is registered
- Check browser console for errors
- Service workers require HTTPS (or localhost)

### Native app installation fails
- You need an Apple Developer account for TestFlight
- For direct install, you may need to trust the developer certificate
- Check iPad settings → General → VPN & Device Management

## Quick Test

To quickly test if everything works:

```bash
# Terminal 1: Build
npm run build

# Terminal 2: Serve
cd dist && python3 -m http.server 8000

# Then on iPad: http://YOUR_COMPUTER_IP:8000
```

## Recommended Approach

For the fastest setup:
1. **Build**: `npm run build`
2. **Deploy to Netlify** (free, takes 2 minutes)
3. **Access from iPad Safari**
4. **Add to Home Screen**

This gives you a working app in under 5 minutes!

