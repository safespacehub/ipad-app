# Codemagic TestFlight Setup - Quick Guide

Your build is now configured to automatically upload to TestFlight! Here's the quick setup.

## Step 1: Create App Store Connect API Key

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Users and Access → Keys → App Store Connect API
3. Click "+" to create new key
4. Name: "Codemagic"
5. Role: "App Manager" or "Admin"
6. Download the `.p8` file (you can only download once!)
7. Note the **Key ID** and **Issuer ID** (shown on the page)

## Step 2: Add to Codemagic

1. Go to Codemagic dashboard → Teams → Your team
2. Environment variables → Add variable
3. Add these three variables:

   **Variable 1:**
   - Name: `APP_STORE_CONNECT_ISSUER_ID`
   - Value: Your Issuer ID (from App Store Connect)
   - Group: `app_store_credentials`

   **Variable 2:**
   - Name: `APP_STORE_CONNECT_KEY_ID`
   - Value: Your Key ID (from App Store Connect)
   - Group: `app_store_credentials`

   **Variable 3:**
   - Name: `APP_STORE_CONNECT_KEY_CONTENT`
   - Value: Contents of the `.p8` file (open in text editor, copy all content)
   - Group: `app_store_credentials`
   - Mark as "Secure" (hidden value)

## Step 3: Configure Code Signing

1. Codemagic dashboard → Teams → Code signing identities
2. Add Apple Developer account:
   - Apple ID: Your developer account email
   - App-Specific Password: Create at [appleid.apple.com](https://appleid.apple.com)
3. Codemagic will automatically handle certificates

## Step 4: Create App in App Store Connect

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. My Apps → "+" → New App
3. Fill in:
   - Platform: iOS
   - Name: "Flight Log"
   - Primary Language: English
   - Bundle ID: `com.jtorba.ipadapp` ⚠️ **Must match exactly!**
   - SKU: Any unique ID (e.g., "flight-log-001")
4. Save

## Step 5: Build!

1. Push your code to GitHub (if not already)
2. In Codemagic, start a new build
3. The build will:
   - ✅ Build with proper code signing
   - ✅ Export IPA for App Store
   - ✅ Upload to App Store Connect automatically
   - ✅ Submit to TestFlight automatically

## Step 6: Install on iPad

1. Wait 5-30 minutes for App Store Connect to process
2. Install TestFlight app from App Store
3. Go to App Store Connect → TestFlight
4. Add yourself as internal tester
5. Accept invitation in TestFlight app
6. Install your app!

## Alternative: Apple ID Method

If you prefer using Apple ID instead of API key:

1. Create App-Specific Password at [appleid.apple.com](https://appleid.apple.com)
2. Add to Codemagic:
   - `APPLE_ID`: Your Apple ID email
   - `APPLE_APP_SPECIFIC_PASSWORD`: The app-specific password
3. Update `codemagic.yaml` publishing section to use:
   ```yaml
   username: $APPLE_ID
   password: $APPLE_APP_SPECIFIC_PASSWORD
   ```

## Troubleshooting

**Build succeeds but no upload**:
- Check that API key variables are in `app_store_credentials` group
- Verify API key has correct permissions (App Manager or Admin)
- Check build logs for upload errors

**"Invalid credentials"**:
- Verify API key content is correct (entire .p8 file content)
- Check Key ID and Issuer ID match App Store Connect
- Make sure variables are in the correct group

**"App not found"**:
- Verify app exists in App Store Connect
- Check bundle ID matches exactly: `com.jtorba.ipadapp`
- Make sure app is in "Prepare for Submission" or "Ready for Sale" status

## What Happens After Upload

1. **Upload completes** → Build shows "Upload successful"
2. **App Store Connect processes** → Takes 5-30 minutes
3. **Email notification** → You'll get an email when processing is done
4. **Available in TestFlight** → Build appears in TestFlight tab
5. **Testers can install** → If added to beta groups

## Next Build

Every time you push code and build:
- ✅ Automatic code signing
- ✅ Automatic IPA export
- ✅ Automatic TestFlight upload
- ✅ Automatic distribution to testers

No manual steps needed! 🚀

