# Apple Developer Account Setup

Since you have an Apple Developer account, you can properly code sign your app and distribute it via TestFlight or the App Store!

## Benefits of Having a Developer Account

✅ **Proper Code Signing** - Apps are properly signed and trusted
✅ **No 7-Day Expiration** - Apps don't expire like with free accounts
✅ **TestFlight Distribution** - Distribute to up to 10,000 testers
✅ **App Store Submission** - Can submit to the App Store
✅ **Multiple Devices** - Install on unlimited devices

## Setup Options

### Option 1: Codemagic (Easiest - Recommended)

Codemagic can handle code signing automatically using your Apple Developer account.

1. **Sign up at [codemagic.io](https://codemagic.io)**

2. **Connect your GitHub repository**

3. **Add Apple Developer Credentials**:
   - Go to Codemagic dashboard → Teams → Your team
   - Click "Code signing identities"
   - Add your Apple Developer account
   - Upload your certificates or let Codemagic generate them

4. **Update codemagic.yaml**:
   - The build will automatically use your credentials
   - No manual configuration needed!

### Option 2: GitHub Actions with Secrets

You can store your Apple Developer credentials as GitHub secrets.

1. **Get your credentials**:
   - Apple ID (your developer account email)
   - App-Specific Password (create at appleid.apple.com)
   - Team ID (from developer.apple.com)

2. **Add GitHub Secrets**:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `APPLE_ID`: Your Apple ID email
     - `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password
     - `APPLE_TEAM_ID`: Your Team ID

3. **Update the workflow** to use these secrets

### Option 3: Manual Certificate Management

If you want to manage certificates yourself:

1. **Generate certificates** (requires macOS or access to one):
   - Use Xcode or `fastlane match`
   - Export certificates and provisioning profiles

2. **Store in secure location**:
   - Use a secrets manager
   - Or store encrypted in your repo

3. **Configure build to use them**

## Updating Build Configuration

I'll update the build scripts to support proper code signing when credentials are available.

## TestFlight Distribution

Once your app is properly signed:

1. **Upload to App Store Connect**:
   - Use Transporter app (Mac) or `xcrun altool` (command line)
   - Or use Codemagic's automatic upload

2. **Add to TestFlight**:
   - Go to App Store Connect → TestFlight
   - Add internal testers (up to 100)
   - Add external testers (up to 10,000)

3. **Install on iPad**:
   - Install TestFlight app from App Store
   - Accept invitation
   - Install your app

## Next Steps

1. Choose your preferred method (Codemagic is easiest)
2. Set up credentials
3. Update build configuration
4. Build and distribute!

Let me know which method you prefer, and I'll help you set it up!

