# TestFlight Setup Guide

With your Apple Developer account, you can distribute your app via TestFlight!

## Prerequisites

✅ Apple Developer account ($99/year) - You have this!
✅ App built and signed with your Developer account
✅ App Store Connect access

## Step 1: Set Up Codemagic with Your Developer Account

### In Codemagic Dashboard:

1. **Go to Teams → Your Team → Code signing identities**

2. **Add Apple Developer Account**:
   - Click "Add account"
   - Enter your Apple ID (the one associated with your Developer account)
   - Enter your App-Specific Password:
     - Go to [appleid.apple.com](https://appleid.apple.com)
     - Sign in → App-Specific Passwords
     - Generate a new password for "Codemagic"
     - Copy and paste it

3. **Codemagic will automatically**:
   - Generate certificates
   - Create provisioning profiles
   - Handle code signing

## Step 2: Create App in App Store Connect

1. **Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)**

2. **Create a new app**:
   - Click "My Apps" → "+" → "New App"
   - Platform: iOS
   - Name: "Flight Log" (or your preferred name)
   - Primary Language: English
   - Bundle ID: `com.flightlog.ipad` (matches your capacitor.config.ts)
   - SKU: Any unique identifier (e.g., "flight-log-001")
   - User Access: Full Access

3. **Save the app**

## Step 3: Build and Upload

### Option A: Automatic Upload (Codemagic)

Add this to your `codemagic.yaml` after the export step:

```yaml
      - name: Upload to App Store Connect
        script: |
          if [ -n "$APPLE_TEAM_ID" ] && [ -f "ios/App/build/export/*.ipa" ]; then
            echo "Uploading to App Store Connect..."
            xcrun altool --upload-app \
              --type ios \
              --file "ios/App/build/export/*.ipa" \
              --username "$APPLE_ID" \
              --password "@env:APPLE_APP_SPECIFIC_PASSWORD"
          else
            echo "Skipping upload - no credentials or IPA not found"
          fi
```

### Option B: Manual Upload

1. **Download the .ipa** from Codemagic build artifacts

2. **Use Transporter app** (Mac) or command line:
   ```bash
   # On Mac
   xcrun altool --upload-app \
     --type ios \
     --file App.ipa \
     --username your-apple-id@example.com \
     --password @keychain:altool
   ```

3. **Or use Transporter GUI**:
   - Download Transporter from Mac App Store
   - Drag .ipa file into Transporter
   - Click "Deliver"

## Step 4: Add to TestFlight

1. **Wait for processing** (5-30 minutes):
   - App Store Connect will process your upload
   - You'll get an email when it's ready

2. **Go to TestFlight**:
   - In App Store Connect, select your app
   - Click "TestFlight" tab

3. **Add Internal Testers** (up to 100):
   - Click "Internal Testing"
   - Add testers by email
   - They'll get an invitation

4. **Add External Testers** (up to 10,000):
   - Click "External Testing"
   - Create a group
   - Add testers
   - Submit for Beta App Review (first time only)

## Step 5: Install on Your iPad

1. **Install TestFlight app** from App Store

2. **Accept invitation**:
   - Check your email for TestFlight invitation
   - Tap "View in TestFlight" or open TestFlight app
   - Tap "Accept"

3. **Install your app**:
   - Your app will appear in TestFlight
   - Tap "Install"
   - Done! 🎉

## Benefits of TestFlight

✅ **No Expiration** - Apps don't expire (unlike AltStore/Sideloadly)
✅ **Easy Updates** - Push updates, testers get notified
✅ **Crash Reports** - Automatic crash reporting
✅ **Feedback** - Testers can provide feedback
✅ **Multiple Versions** - Test different builds
✅ **Up to 10,000 Testers** - Great for beta testing

## Troubleshooting

**"Processing" taking too long**:
- First upload can take 30+ minutes
- Subsequent uploads are usually faster

**Build rejected**:
- Check email for details
- Common issues: missing privacy info, invalid bundle ID

**Can't add testers**:
- Make sure app is processed
- External testing requires Beta App Review first time

**App crashes**:
- Check TestFlight crash reports
- Review logs in App Store Connect

## Next Steps

1. Set up Codemagic with your Developer account
2. Create app in App Store Connect
3. Build and upload
4. Add testers
5. Install via TestFlight!

Your app will be properly signed and ready for distribution! 🚀

