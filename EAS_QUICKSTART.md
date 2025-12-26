# EAS Build Quick Start

## ⚠️ Important Note

**EAS Build is optimized for Expo projects, not Capacitor.** While it's possible to use EAS Build with Capacitor, it requires additional setup and may not work seamlessly.

**Better alternatives for Capacitor:**
- **Codemagic** - Native Capacitor support
- **GitHub Actions** - Free for public repos
- **Web App (PWA)** - Already working, easiest option

## If You Still Want to Use EAS Build

### Quick Setup Steps

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login**:
   ```bash
   eas login
   ```

3. **The `eas.json` is already configured**

4. **Build**:
   ```bash
   # For testing (no Apple Developer account needed)
   eas build --platform ios --profile preview
   
   # For App Store (requires Apple Developer account)
   eas build --platform ios --profile production
   ```

### The Challenge

EAS Build expects an Expo project structure. For Capacitor, you'll need to:

1. **Initialize the iOS project first** (requires Node 22+):
   ```bash
   # Install Node 22 using nvm
   nvm install 22
   nvm use 22
   
   # Initialize Capacitor
   npx cap init
   npx cap add ios
   npm run build
   npx cap sync
   ```

2. **EAS Build will then build the iOS project**

### Recommended: Use Codemagic Instead

Codemagic has native Capacitor support and is easier:

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Sign up at [codemagic.io](https://codemagic.io)**

3. **Connect your GitHub repo**

4. **The `codemagic.yaml` is already configured**

5. **Start a build** from the dashboard

6. **Download the .ipa file**

### Or Use GitHub Actions (Free)

1. **Push to GitHub** (same as above)

2. **Go to Actions tab**

3. **The workflow will build automatically**

4. **Download the .ipa artifact**

## My Recommendation

For your situation (Linux, no macOS):

1. **For immediate use**: Web app (PWA) - already working! ✅
2. **For native app (free)**: GitHub Actions with public repo
3. **For native app (paid)**: Codemagic ($95/month) or EAS Build ($29/month)

The web app version works great and feels native when added to the home screen!

