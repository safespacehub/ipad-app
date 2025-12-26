# Create App Store Connect Integration - Step by Step

The build is failing because the integration doesn't exist yet. Here's exactly how to create it:

## Step 1: Get Your App Store Connect API Key

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Sign in with your Apple Developer account
3. Click **Users and Access** (top right)
4. Click **Keys** tab
5. Click **App Store Connect API** section
6. Click **"+"** (Generate API Key button)
7. Fill in:
   - **Name**: "Codemagic" (or any name)
   - **Access**: "App Manager" or "Admin"
8. Click **Generate**
9. **IMPORTANT**: Download the `.p8` file immediately (you can only download once!)
10. **Note these three values** (you'll need them):
    - **Issuer ID**: Shown at the top of the Keys page (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
    - **Key ID**: Shown in the table for your new key (looks like: `ABC123XYZ`)
    - **API Key**: The `.p8` file you downloaded

## Step 2: Create Integration in Codemagic

1. Go to [codemagic.io](https://codemagic.io) and sign in
2. Click **Teams** (or your team name) in the left sidebar
3. Click **Integrations** (or go to Team settings → Integrations)
4. Find **App Store Connect** in the list
5. Click **Add integration** (or the **+** button)
6. Fill in the form:
   - **Integration name**: `App Store Connect API Key` (or any name you prefer)
   - **Issuer ID**: Paste the Issuer ID from Step 1
   - **Key ID**: Paste the Key ID from Step 1
   - **API Key**: Click "Choose file" and upload the `.p8` file
7. Click **Save** or **Add integration**

## Step 3: Update codemagic.yaml

1. **Note the exact integration name** you used in Step 2
2. **Open `codemagic.yaml`**
3. **Find the integrations section** (around line 6-7)
4. **Uncomment and set the name**:
   ```yaml
   integrations:
     app_store_connect: App Store Connect API Key
   ```
   (Use the exact name from Step 2)

5. **Find the publishing section** (around line 407)
6. **Uncomment the app_store_connect section**:
   ```yaml
   app_store_connect:
     auth: integration
     submit_to_testflight: true
   ```

## Step 4: Verify

Your `codemagic.yaml` should have:

```yaml
workflows:
  ios-workflow:
    integrations:
      app_store_connect: App Store Connect API Key  # Your integration name
    
    publishing:
      app_store_connect:
        auth: integration
        submit_to_testflight: true
```

## Step 5: Build Again

1. Push the updated `codemagic.yaml` to GitHub
2. Start a new build in Codemagic
3. The integration should now be found!

## Troubleshooting

**"Integration does not exist"**:
- Double-check the integration name matches exactly (case-sensitive)
- Make sure you created it in the correct team/account
- Verify the integration is active (not deleted)

**"Invalid credentials"**:
- Verify Issuer ID, Key ID are correct
- Make sure the `.p8` file is the correct one
- Check API key hasn't expired or been revoked

**"Permission denied"**:
- Make sure API key has "App Manager" or "Admin" role
- Verify your Apple Developer account has proper permissions

## Quick Reference

- **Issuer ID**: Found at top of App Store Connect → Users and Access → Keys page
- **Key ID**: Shown in the API key table
- **API Key**: The `.p8` file you downloaded
- **Integration Name**: What you name it in Codemagic (must match YAML exactly)

Once you create the integration, the build will work! 🚀

