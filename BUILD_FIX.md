# Build Fix - iOS Platform Initialization

## Problem

The build was failing with:
```
[error] ios platform has not been added yet.
```

This happens because Capacitor requires the iOS platform to be added before syncing, but we can't do this on Linux (requires macOS).

## Solution

Updated both build configurations to automatically add the iOS platform if it doesn't exist:

### Codemagic (`codemagic.yaml`)
- Added step: "Add iOS platform (if not exists)"
- Checks if `ios/` directory exists
- If not, runs `npx cap add ios` before syncing

### GitHub Actions (`.github/workflows/ios-build.yml`)
- Added step: "Add iOS platform (if not exists)"
- Same logic - adds platform if missing

## How It Works

1. Build runs on macOS (Codemagic or GitHub Actions)
2. Checks if `ios/` directory exists
3. If not, runs `npx cap add ios` to create it
4. Then runs `npx cap sync ios` to sync the web build
5. Continues with Xcode build

## Updated Files

- ✅ `codemagic.yaml` - Added iOS platform check
- ✅ `.github/workflows/ios-build.yml` - Added iOS platform check
- ✅ `capacitor.config.ts` - Updated app name to "Flight Log"

## Next Build

The next time you run a build (Codemagic or GitHub Actions), it will:
1. Automatically add the iOS platform if needed
2. Sync your web build
3. Build the iOS app

No manual intervention needed!

