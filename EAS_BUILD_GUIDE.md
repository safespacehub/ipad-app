# EAS Build Guide for iOS App

This guide will walk you through using EAS Build to create a native iOS app from your Capacitor project.

## Important Note

EAS Build is primarily designed for **Expo** projects. For Capacitor projects, you have two options:

1. **Use EAS Build with Capacitor** (requires some setup)
2. **Use alternative services** that support Capacitor better (Codemagic, GitHub Actions)

This guide covers both approaches.

## Prerequisites

- Node.js 18+ (22+ recommended)
- Expo account (free at [expo.dev](https://expo.dev))
- Apple Developer account ($99/year) - Required for App Store distribution
  - For development/testing only, you can use a free Apple ID with limitations

## Option 1: EAS Build with Capacitor (Recommended)

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
eas login
```

Create a free account if you don't have one.

### Step 3: Configure EAS Build

```bash
eas build:configure
```

This will create an `eas.json` file. We'll customize it for Capacitor.

### Step 4: Create EAS Configuration

Create or update `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": false,
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "ios": {
        "distribution": "app-store"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Step 5: Build the Web App

```bash
npm run build
```

### Step 6: Initialize Capacitor iOS Project

**Note**: This step requires Node 22+ and will create the iOS project structure. Since you're on Linux, you have a few options:

#### Option A: Use a Node Version Manager

```bash
# Install nvm if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node 22
nvm install 22
nvm use 22

# Now initialize Capacitor
npx cap init
npx cap add ios
npx cap sync
```

#### Option B: Let EAS Build Handle It

EAS Build can create the iOS project during the build process. We'll configure a build hook for this.

### Step 7: Create Build Script

Create a script that EAS Build can use. Update `package.json`:

```json
{
  "scripts": {
    "eas:prebuild": "npm run build && npx cap sync ios"
  }
}
```

### Step 8: Configure Build Hooks

Update `eas.json` to include build hooks:

```json
{
  "build": {
    "production": {
      "env": {
        "NODE_VERSION": "22"
      },
      "ios": {
        "distribution": "app-store",
        "buildConfiguration": "Release"
      }
    }
  }
}
```

### Step 9: Build for iOS

For development/testing (no Apple Developer account needed initially):

```bash
eas build --platform ios --profile preview
```

For App Store distribution:

```bash
eas build --platform ios --profile production
```

### Step 10: Install on iPad

Once the build completes:

1. **Download the .ipa file** from the EAS Build dashboard
2. **Install on iPad** using one of these methods:

   **Method A: AltStore** (Free, no Apple Developer account needed for 7 days)
   - Install [AltStore](https://altstore.io/) on your iPad
   - Transfer the .ipa file to your iPad
   - Open in AltStore and install

   **Method B: Sideloadly** (Free, 7-day certificates)
   - Download [Sideloadly](https://sideloadly.io/)
   - Connect iPad via USB
   - Drag .ipa file into Sideloadly
   - Enter your Apple ID
   - Install

   **Method C: TestFlight** (Requires Apple Developer account)
   - Upload to App Store Connect
   - Add to TestFlight
   - Install TestFlight app on iPad
   - Install your app from TestFlight

## Option 2: Alternative - Use Codemagic (Easier for Capacitor)

Codemagic has better native support for Capacitor projects:

1. **Sign up** at [codemagic.io](https://codemagic.io)
2. **Connect your GitHub repo** (or push this project to GitHub)
3. **The `codemagic.yaml` file is already configured**
4. **Trigger a build** from the dashboard
5. **Download the .ipa** from Codemagic

## Option 3: GitHub Actions (Free for Public Repos)

The `.github/workflows/ios-build.yml` file is already set up:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Go to Actions tab** in GitHub
3. **The workflow will build automatically**
4. **Download the .ipa artifact**

## Troubleshooting EAS Build

### "Capacitor not found"
Make sure Capacitor is installed:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
```

### "iOS project not found"
You need to initialize the iOS project first. Use Option A above with Node 22+.

### "Code signing failed"
- For preview builds: EAS can use a free Apple ID
- For production: You need a paid Apple Developer account ($99/year)

### "Build timeout"
Free tier has build time limits. Consider upgrading or using Codemagic.

## Cost Comparison

- **EAS Build**: Free tier (limited builds), then $29/month
- **Codemagic**: Free for open source, $95/month for private
- **GitHub Actions**: Free for public repos, 2000 minutes/month for private
- **Apple Developer**: $99/year (required for App Store)

## Recommended Approach

For your situation (Linux, no macOS):

1. **Quick testing**: Use the web app (PWA) - already working!
2. **Native app (free)**: Use GitHub Actions if your repo is public
3. **Native app (paid)**: Use Codemagic or EAS Build with paid tier

## Next Steps

1. Choose your build service
2. Set up the configuration
3. Run your first build
4. Install on your iPad Mini

Let me know which approach you'd like to use, and I can help you set it up!

