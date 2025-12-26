# ExportOptions.plist Fix

## Problem

Build was failing with:
```
error: Couldn't load -exportOptionsPlist The file "ExportOptions.plist" couldn't be opened because there is no such file.
```

## Solution

✅ Created `ios/App/ExportOptions.plist` file
✅ Updated both build scripts to auto-create it if missing

## What Was Done

1. **Created ExportOptions.plist** (`ios/App/ExportOptions.plist`)
   - Set to `development` distribution (for testing)
   - Uses automatic code signing
   - Suitable for development builds

2. **Updated Codemagic** (`codemagic.yaml`)
   - Added step to create ExportOptions.plist if it doesn't exist
   - Ensures the file is always available

3. **Updated GitHub Actions** (`.github/workflows/ios-build.yml`)
   - Same auto-creation logic
   - Ensures consistency across build platforms

## Current Configuration

The ExportOptions.plist is configured for **development** distribution:
- ✅ Works for testing on your own devices
- ✅ No Apple Developer account required (for basic testing)
- ✅ Automatic code signing

## For App Store Submission

If you want to submit to the App Store later, you'll need to:
1. Update `method` to `app-store`
2. Add your Apple Developer Team ID
3. Configure proper code signing certificates

See `ios/App/ExportOptions.plist.README.md` for details.

## Next Build

The build should now complete successfully! The ExportOptions.plist file will be:
- Created automatically if missing
- Used to export the IPA file
- Configured for development distribution

