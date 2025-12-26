# Create App Store Connect Integration - Step by Step

Follow these steps in order:

## Part 1: Create API Key in App Store Connect

### Step 1.1: Go to App Store Connect
1. Open [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Sign in with your Apple Developer account

### Step 1.2: Navigate to Keys
1. Click **Users and Access** (top right, next to your name)
2. Click the **Keys** tab
3. You should see "App Store Connect API" section

### Step 1.3: Generate API Key
1. Click the **"+"** button (or "Generate API Key" button)
2. Fill in:
   - **Name**: `Codemagic` (or any name you like)
   - **Access**: Select **"App Manager"** or **"Admin"**
3. Click **Generate**
4. **IMPORTANT**: You'll see a page with:
   - **Issuer ID** at the top (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
   - **Key ID** in the table (looks like: `ABC123XYZ`)
   - **Download API Key** button

### Step 1.4: Download and Save Information
1. **Download the `.p8` file** immediately (you can only download once!)
2. **Copy the Issuer ID** (save it somewhere)
3. **Copy the Key ID** (save it somewhere)
4. **Save the `.p8` file** somewhere safe

**You now have:**
- ✅ Issuer ID
- ✅ Key ID  
- ✅ `.p8` API key file

---

## Part 2: Create Integration in Codemagic

### Step 2.1: Go to Codemagic
1. Open [codemagic.io](https://codemagic.io)
2. Sign in to your Codemagic account

### Step 2.2: Navigate to Integrations
1. Click **Teams** in the left sidebar (or your team name)
2. Click **Integrations** (or go to Team settings → Integrations)
3. You should see a list of available integrations

### Step 2.3: Find App Store Connect
1. Scroll down to find **App Store Connect** in the list
2. Click **Add integration** (or the **+** button next to it)

### Step 2.4: Fill in Integration Details
1. **Integration name**: Enter `App Store Connect API Key`
   - ⚠️ **Important**: Use this exact name (or remember what you name it)
2. **Issuer ID**: Paste the Issuer ID from Part 1
3. **Key ID**: Paste the Key ID from Part 1
4. **API Key**: Click "Choose file" or "Upload" and select the `.p8` file you downloaded
5. Click **Save** or **Add integration**

**✅ Integration created!**

---

## Part 3: Update codemagic.yaml

### Step 3.1: Open codemagic.yaml
The file is in your project: `/home/turbo/ipad-app/codemagic.yaml`

### Step 3.2: Find the integrations section
Look for line 6-7 (should be commented out):
```yaml
# integrations:
#   app_store_connect: YOUR_INTEGRATION_NAME_HERE
```

### Step 3.3: Uncomment and set the name
Change it to:
```yaml
integrations:
  app_store_connect: App Store Connect API Key
```
(Use the exact name you used in Step 2.4)

### Step 3.4: Find the publishing section
Look for the `app_store_connect` section around line 407 (should be commented out):
```yaml
# app_store_connect:
#   auth: integration
#   submit_to_testflight: true
```

### Step 3.5: Uncomment the publishing section
Change it to:
```yaml
app_store_connect:
  auth: integration
  submit_to_testflight: true
```

### Step 3.6: Save the file
Save `codemagic.yaml`

---

## Part 4: Verify Configuration

Your `codemagic.yaml` should now have:

```yaml
workflows:
  ios-workflow:
    integrations:
      app_store_connect: App Store Connect API Key
    
    # ... build steps ...
    
    publishing:
      app_store_connect:
        auth: integration
        submit_to_testflight: true
```

---

## Part 5: Test the Build

1. **Commit and push** the updated `codemagic.yaml`:
   ```bash
   git add codemagic.yaml
   git commit -m "Configure TestFlight upload"
   git push
   ```

2. **Start a new build** in Codemagic

3. **The build should now**:
   - ✅ Find the integration
   - ✅ Build with code signing
   - ✅ Export IPA
   - ✅ Upload to App Store Connect
   - ✅ Submit to TestFlight automatically!

---

## Troubleshooting

**"Integration does not exist"**:
- Double-check the integration name matches exactly (case-sensitive, no typos)
- Make sure you created it in the correct team/account in Codemagic
- Verify the integration shows as "Active" in Codemagic dashboard

**"Invalid credentials"**:
- Verify Issuer ID and Key ID are correct (no extra spaces)
- Make sure the `.p8` file is the correct one (not corrupted)
- Check API key hasn't been revoked in App Store Connect

**Build succeeds but no upload**:
- Check build logs for upload step
- Verify app exists in App Store Connect with bundle ID: `com.jtorba.ipadapp`
- Make sure code signing is configured in Codemagic

---

## Quick Checklist

- [ ] Created API key in App Store Connect
- [ ] Downloaded `.p8` file
- [ ] Saved Issuer ID and Key ID
- [ ] Created integration in Codemagic dashboard
- [ ] Named integration "App Store Connect API Key" (or updated YAML to match)
- [ ] Uncommented `integrations` section in codemagic.yaml
- [ ] Uncommented `app_store_connect` section in publishing
- [ ] Saved codemagic.yaml
- [ ] Pushed to GitHub
- [ ] Started new build

Once all checked, your build will automatically upload to TestFlight! 🚀

