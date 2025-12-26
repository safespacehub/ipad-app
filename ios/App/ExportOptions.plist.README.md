# ExportOptions.plist

This file configures how the iOS app is exported from Xcode.

## Current Configuration

The file is set to `development` distribution, which is suitable for:
- Testing on your own devices
- Development builds
- No App Store submission

## For App Store Distribution

If you want to submit to the App Store, update the file:

```xml
<key>method</key>
<string>app-store</string>
```

And add your Apple Developer Team ID:

```xml
<key>teamID</key>
<string>YOUR_TEAM_ID</string>
```

## Distribution Methods

- `development` - For development/testing (current)
- `ad-hoc` - For limited device distribution
- `enterprise` - For enterprise distribution (requires Enterprise account)
- `app-store` - For App Store submission

## Automatic Creation

The build scripts will automatically create this file if it doesn't exist, so you don't need to worry about it being missing.

