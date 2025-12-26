# TestFlight Automatic Upload Setup

The build is now configured to automatically upload to TestFlight! Here's how to set it up.

## Prerequisites

✅ Apple Developer account - You have this!
✅ App created in App Store Connect with bundle ID: `com.jtorba.ipadapp`
✅ Codemagic account connected to your GitHub repo

## Setup in Codemagic

### Method 1: App Store Connect API (Recommended)

This is the most secure and recommended method.

1. **Create App Store Connect API Key**:
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Users and Access → Keys → App Store Connect API
   - Click "+" to create a new key
   - Name it "Codemagic" or similar
   - Select "App Manager" or "Admin" role
   - Download the `.p8` key file (you can only download it once!)
   - Note the **Key ID** and **Issuer ID**

2. **Add to Codemagic**:
   - Go to Codemagic dashboard → Teams → Your team
   - Environment variables → Add variable
   - Add these variables:
     - `APP_STORE_CONNECT_API_KEY`: Contents of the `.p8` file (or upload the file)
     - `APP_STORE_CONNECT_ISSUER_ID`: Your Issuer ID (from App Store Connect)
     - `APP_STORE_CONNECT_KEY_ID`: Your Key ID (from App Store Connect)

3. **Add to Build Group**:
   - Make sure these variables are in the `app_store_credentials` group
   - Or add them to your workflow's environment variables

### Method 2: Apple ID with App-Specific Password

Alternative method using your Apple ID.

1. **Create App-Specific Password**:
   - Go to [appleid.apple.com](https://appleid.apple.com)
   - Sign in → App-Specific Passwords
   - Generate a new password
   - Name it "Codemagic TestFlight Upload"
   - Copy the password (you'll only see it once!)

2. **Add to Codemagic**:
   - Go to Codemagic dashboard → Teams → Your team
   - Environment variables → Add variable
   - Add these variables:
     - `APPLE_ID`: Your Apple ID email
     - `APPLE_APP_SPECIFIC_PASSWORD`: The app-specific password you created

3. **Add to Build Group**:
   - Make sure these are in the `app_store_credentials` group

## Code Signing Setup

You also need to configure code signing:

1. **Go to Codemagic → Teams → Code signing identities**

2. **Add Apple Developer Account**:
   - Click "Add account"
   - Enter your Apple ID
   - Enter App-Specific Password (different from upload password)
   - Codemagic will automatically:
     - Generate certificates
     - Create provisioning profiles
     - Handle code signing

## How It Works

When you run a build:

1. **Build the app** with proper code signing
2. **Export IPA** for App Store distribution
3. **Upload to App Store Connect** automatically
4. **Process in App Store Connect** (takes 5-30 minutes)
5. **Available in TestFlight** automatically!

## Build Configuration

The build will:
- ✅ Check if credentials are available
- ✅ Use proper code signing if credentials found
- ✅ Export IPA for App Store distribution
- ✅ Upload to App Store Connect automatically
- ✅ Fall back gracefully if credentials not configured

## Verification

After a successful build, check:

1. **Codemagic build logs**:
   - Look for "Uploading to App Store Connect for TestFlight..."
   - Should see "Upload successful" message

2. **App Store Connect**:
   - Go to your app → TestFlight
   - You should see the new build processing
   - Wait 5-30 minutes for processing to complete

3. **TestFlight app**:
   - Once processed, the build will appear in TestFlight
   - Testers can install it immediately

## Troubleshooting

**"No App Store Connect credentials configured"**:
- Make sure you added the environment variables
- Check they're in the correct group (`app_store_credentials`)
- Verify variable names are correct

**"Upload failed"**:
- Check API key permissions (needs App Manager or Admin)
- Verify App-Specific Password is correct
- Make sure app exists in App Store Connect with correct bundle ID

**"App is not properly code signed"**:
- Configure code signing identities in Codemagic
- Make sure certificates are valid
- Check Team ID matches

**Build succeeds but no upload**:
- Check build logs for upload step
- Verify credentials are in the environment
- Check if IPA was created successfully

## Next Steps

1. **Set up credentials in Codemagic** (choose Method 1 or 2 above)
2. **Configure code signing** in Codemagic dashboard
3. **Create app in App Store Connect** with bundle ID: `com.jtorba.ipadapp`
4. **Run a build** - it will automatically upload to TestFlight!
5. **Wait for processing** (5-30 minutes)
6. **Install from TestFlight** on your iPad

## Manual Upload (Fallback)

If automatic upload fails, you can still:
1. Download the IPA from Codemagic build artifacts
2. Upload manually using Transporter app (Mac) or command line
3. See `TESTFLIGHT_SETUP.md` for manual upload instructions

Your build is now configured for automatic TestFlight distribution! 🚀

