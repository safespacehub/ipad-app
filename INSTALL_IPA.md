# Installing .ipa File on iPad

Congratulations! You've built your iOS app. Now here's how to install it on your iPad Mini.

## Option 1: TestFlight (Recommended - With Apple Developer Account) ⭐

**Best for**: You have an Apple Developer account - use this!

### Steps:

1. **Set up Codemagic with your Developer account**:
   - Go to Codemagic dashboard → Teams → Code signing identities
   - Add your Apple ID and App-Specific Password
   - Codemagic will handle code signing automatically

2. **Create app in App Store Connect**:
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Create new app with Bundle ID: `com.jtorba.ipadapp`
   - See `TESTFLIGHT_SETUP.md` for detailed steps

3. **Build and upload**:
   - Codemagic will build with proper code signing
   - Upload to App Store Connect (automatic or manual)

4. **Add to TestFlight**:
   - In App Store Connect → TestFlight
   - Add yourself as internal tester
   - Or add external testers (up to 10,000)

5. **Install on iPad**:
   - Install TestFlight app from App Store
   - Accept invitation
   - Install your app

**Benefits**: 
- ✅ No expiration (unlike AltStore)
- ✅ Easy updates
- ✅ Crash reports
- ✅ Up to 10,000 testers

See `TESTFLIGHT_SETUP.md` for complete setup instructions.

## Option 2: AltStore (Quick Testing - No Developer Account Needed)

**Best for**: Testing on your own device without an Apple Developer account

### Steps:

1. **Install AltStore on your iPad**:
   - On your iPad, open Safari
   - Go to [altstore.io](https://altstore.io)
   - Tap "Download" and install AltStore

2. **Install AltServer on your computer** (Windows/Mac):
   - Download from [altstore.io](https://altstore.io)
   - Install and run AltServer
   - Make sure your iPad and computer are on the same WiFi network

3. **Transfer the .ipa file to your iPad**:
   - Email it to yourself, or
   - Use AirDrop, or
   - Use cloud storage (iCloud, Dropbox, etc.), or
   - Use a file sharing service

4. **Install the app**:
   - Open the .ipa file on your iPad (tap it in Files, Mail, etc.)
   - Choose "Open in AltStore"
   - AltStore will install it

**Note**: Apps installed via AltStore expire after 7 days. You'll need to refresh them (AltStore does this automatically when your devices are on the same network).

## Option 2: Sideloadly (Free, No Developer Account)

**Best for**: Quick installation from Windows/Mac

### Steps:

1. **Download Sideloadly**:
   - Go to [sideloadly.io](https://sideloadly.io)
   - Download for Windows or Mac

2. **Connect your iPad**:
   - Connect iPad to computer via USB
   - Trust the computer on your iPad if prompted

3. **Install the app**:
   - Open Sideloadly
   - Drag the .ipa file into Sideloadly
   - Enter your Apple ID (free account works)
   - Click "Start"
   - Enter your Apple ID password when prompted

**Note**: Apps expire after 7 days. Re-install to refresh.

## Option 3: TestFlight (Requires Apple Developer Account - $99/year)

**Best for**: Distribution to multiple testers or App Store preparation

### Steps:

1. **Upload to App Store Connect**:
   - Sign in to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Create an app record
   - Upload the .ipa using Transporter app or Xcode

2. **Add to TestFlight**:
   - In App Store Connect, go to TestFlight
   - Add internal or external testers
   - Testers get an email invitation

3. **Install on iPad**:
   - Install TestFlight app from App Store
   - Accept the invitation
   - Install your app from TestFlight

## Option 4: Direct Install via Xcode (Requires macOS)

**Best for**: If you have access to a Mac

### Steps:

1. **Connect iPad to Mac via USB**
2. **Open Xcode**
3. **Window → Devices and Simulators**
4. **Select your iPad**
5. **Drag .ipa file into "Installed Apps" section**

## Option 5: 3uTools / iMazing (Third-party tools)

**Best for**: Alternative installation methods

- **3uTools**: Free tool for Windows/Mac
- **iMazing**: Paid tool with free trial

Both allow installing .ipa files via USB connection.

## Important Notes

### App Expiration

- **AltStore/Sideloadly**: Apps expire after 7 days (free Apple ID)
- **TestFlight**: Apps don't expire (paid Developer account)
- **App Store**: Apps don't expire (paid Developer account)

### Code Signing

Your current .ipa is **unsigned** (for development). For:
- **Testing**: Unsigned is fine (AltStore/Sideloadly can handle it)
- **App Store**: You'll need proper code signing with a Developer account

### Troubleshooting

**"Untrusted Developer" error**:
- Go to Settings → General → VPN & Device Management
- Find your developer certificate
- Tap "Trust"

**App won't install**:
- Make sure you're using a compatible method
- Check that the .ipa file isn't corrupted
- Try a different installation method

**App crashes on launch**:
- This might be due to missing code signing
- Try using AltStore or Sideloadly which handle signing

## Recommended Approach

Since you have an Apple Developer account:

1. **Best option**: Use **TestFlight** (proper signing, no expiration, easy updates)
   - Set up Codemagic with your Developer credentials
   - Build will be properly signed
   - Upload to App Store Connect
   - Distribute via TestFlight

2. **Quick testing**: Use **Sideloadly** (if you need to test unsigned builds quickly)
   - Works from Debian via USB
   - Apps expire after 7 days

3. **Alternative**: Use **AltStore** (if you want wireless installation)
   - Apps expire after 7 days
   - Good for quick testing

## Next Steps

1. Download one of the tools above
2. Transfer your .ipa file to your iPad
3. Install using your chosen method
4. Launch your Flight Log app!

Enjoy your app! 🎉

