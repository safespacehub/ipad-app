# Codemagic App Store Connect Integration Setup

## Quick Setup

Codemagic uses **integrations** for App Store Connect authentication. Here's how to set it up:

## Step 1: Create App Store Connect API Key

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. **Users and Access** → **Keys** → **App Store Connect API**
3. Click **"+"** to create new key
4. **Name**: "Codemagic" (or any name you prefer)
5. **Role**: "App Manager" or "Admin"
6. Click **Generate**
7. **Download the `.p8` file** (you can only download once!)
8. **Note the Key ID and Issuer ID** (shown on the page)

## Step 2: Add Integration in Codemagic

1. Go to **Codemagic dashboard**
2. **Teams** → **Your Team** → **Integrations**
   - (Or **Personal Account** → **Integrations** for personal projects)
3. Find **App Store Connect** and click **Add integration**
4. Fill in:
   - **Integration name**: "App Store Connect API Key" (or any name)
   - **Issuer ID**: Your Issuer ID from App Store Connect
   - **Key ID**: Your Key ID from App Store Connect
   - **API Key**: Upload the `.p8` file you downloaded
5. Click **Save**

## Step 3: Update codemagic.yaml

The file is already configured! Just make sure:

1. **Integration name matches** in the `integrations` section:
   ```yaml
   integrations:
     app_store_connect: App Store Connect API Key
   ```
   (Use the exact name you gave the integration in Step 2)

2. **Publishing section** is set to:
   ```yaml
   app_store_connect:
     auth: integration
     submit_to_testflight: true
   ```

## Step 4: Verify Configuration

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

## How It Works

1. **Integration stores credentials** securely in Codemagic
2. **YAML references the integration** by name
3. **Build uses the integration** automatically
4. **Uploads to TestFlight** automatically

## Troubleshooting

**"Invalid auth value" error**:
- Make sure you created the integration in Codemagic dashboard first
- Check the integration name matches exactly in `codemagic.yaml`
- Integration name is case-sensitive

**"Integration not found"**:
- Verify integration exists in Codemagic dashboard
- Check integration name spelling
- Make sure it's in the correct team/account

**Upload fails**:
- Verify API key has correct permissions (App Manager or Admin)
- Check that app exists in App Store Connect with bundle ID: `com.jtorba.ipadapp`
- Verify integration is active in Codemagic

## Next Build

Once configured:
1. Push code to GitHub
2. Start build in Codemagic
3. Build will automatically:
   - ✅ Code sign with your Developer account
   - ✅ Export IPA
   - ✅ Upload to App Store Connect
   - ✅ Submit to TestFlight

No manual steps needed! 🚀

