# Podfile Missing Fix

## Problem

Build was failing with:
```
[error] Error: ENOENT: no such file or directory, open '/Users/builder/clone/ios/App/Podfile'
✖ Updating iOS native dependencies with pod install - failed!
```

This happens when Capacitor tries to run `pod install` but the Podfile doesn't exist.

## Root Cause

When `npx cap add ios` runs, it should create:
- `ios/App/` directory structure
- `ios/App/Podfile` file
- Xcode project files

Sometimes the Podfile isn't created properly, or the iOS project structure isn't fully initialized.

## Solution

Updated build scripts to:

1. **Verify iOS platform is fully added**
   - Check if `ios/App/Podfile` or `ios/Podfile` exists
   - If not, remove and re-add the iOS platform

2. **Install CocoaPods**
   - Ensure CocoaPods is installed before syncing
   - Required for `pod install` to work

3. **Better error handling**
   - Check project structure if sync fails
   - Attempt manual `pod install` if Podfile exists but sync failed
   - Provide detailed debugging output

## Updated Build Steps

### Codemagic
- Added CocoaPods installation check
- Enhanced iOS platform verification
- Added fallback pod install if sync fails

### GitHub Actions
- Added CocoaPods installation
- Same enhanced verification and fallback

## What Should Happen Now

1. Build checks if iOS platform exists
2. If missing, adds it (which should create Podfile)
3. Verifies Podfile exists
4. If not found, removes and re-adds iOS platform
5. Installs CocoaPods
6. Syncs Capacitor (which runs pod install)
7. If sync fails but Podfile exists, tries manual pod install

## Next Build

The build should now:
- ✅ Properly initialize iOS project
- ✅ Create Podfile automatically
- ✅ Install CocoaPods dependencies
- ✅ Complete the sync successfully

If it still fails, the enhanced error messages will show exactly what's missing.

