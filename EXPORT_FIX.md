# Export IPA Fix

## Problem

Export was failing with:
```
error: exportArchive "teamID" should be non-empty
** EXPORT FAILED **
```

The ExportOptions.plist had an empty `teamID` field, which xcodebuild requires to be non-empty for export.

## Solution

### Updated ExportOptions.plist

Removed the empty `teamID` field and changed:
- `signingStyle` from `automatic` to `manual` (for unsigned builds)
- Removed empty `teamID` field (not needed for manual signing)
- Added `manageAppVersionAndBuildNumber` set to `false`

### Alternative Export Method

Since unsigned development builds can't use the standard export method, added a fallback:
1. **Try standard export first** - Uses ExportOptions.plist
2. **If export fails** - Extract app from archive and create IPA manually
3. **Manual IPA creation**:
   - Extract `App.app` from the archive
   - Create `Payload/` directory
   - Copy app into Payload
   - Zip as `App.ipa`

## Updated ExportOptions.plist

```xml
<dict>
  <key>method</key>
  <string>development</string>
  <key>signingStyle</key>
  <string>manual</string>
  <key>compileBitcode</key>
  <false/>
  <key>manageAppVersionAndBuildNumber</key>
  <false/>
</dict>
```

Note: No `teamID` field - not needed for manual signing.

## Export Flow

1. **Try xcodebuild export** - Standard method
2. **If fails** - Fall back to manual IPA creation
3. **Extract app** from archive
4. **Create IPA** manually using zip
5. **Verify** IPA was created

## For Production Builds

For App Store submission, you'll need to:
1. Add proper `teamID` to ExportOptions.plist
2. Set up code signing certificates
3. Use `method` = `app-store`
4. Use proper signing style

## Next Build

The build should now:
- ✅ Try standard export first
- ✅ Fall back to manual IPA creation if needed
- ✅ Create IPA file successfully
- ✅ Verify IPA was created

The build should complete successfully! 🎉
