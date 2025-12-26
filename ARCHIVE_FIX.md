# Archive Build Fix

## Problem

Build was failing with:
```
error: archive not found at path '/Users/builder/clone/ios/App/build/App.xcarchive'
** EXPORT FAILED **
```

The archive step was running, but the archive wasn't being created or wasn't at the expected path.

## Root Causes

1. **Build directory might not exist** - xcodebuild needs the directory to exist
2. **Archive step might be failing silently** - Errors could be hidden
3. **Path verification missing** - No check to ensure archive was created before export

## Solution

### Changes Made

1. **Create build directory explicitly**
   - Added `mkdir -p build` before archive step
   - Ensures directory exists for xcodebuild

2. **Removed xcpretty from archive step**
   - xcpretty can hide errors
   - Now we see full xcodebuild output
   - Can see exactly what's failing

3. **Added archive verification**
   - Check if archive exists after build step
   - Fail early with helpful error messages
   - Show directory contents if archive is missing

4. **Added pre-export verification**
   - Verify archive exists before attempting export
   - Search for archive files if not at expected path
   - Better error messages

5. **Added export verification**
   - Check if IPA was created after export
   - List export directory contents
   - Show IPA file size if successful

## Updated Build Flow

1. **Build Archive**
   - Create build directory
   - Run xcodebuild archive
   - Verify archive was created
   - Fail if archive is missing

2. **Verify Before Export**
   - Check archive exists at expected path
   - Search for archive if not found
   - Show helpful debugging info

3. **Export IPA**
   - Create export directory
   - Run xcodebuild -exportArchive
   - Verify IPA was created
   - Show file details

## What to Look For

If the build still fails, check the logs for:

1. **Archive build errors**
   - Look for xcodebuild errors in the "Build ipa for distribution" step
   - Check for code signing issues
   - Check for missing dependencies

2. **Archive location**
   - The verification step will show where archives are found
   - Check if path is different than expected

3. **Export errors**
   - Look for export-specific errors
   - Check ExportOptions.plist is valid
   - Check code signing configuration

## Next Build

The build should now:
- ✅ Create build directory before archiving
- ✅ Show full xcodebuild output (no hidden errors)
- ✅ Verify archive exists before export
- ✅ Provide helpful error messages if something fails
- ✅ Verify IPA was created successfully

If it still fails, the enhanced error messages will show exactly what went wrong and where.

