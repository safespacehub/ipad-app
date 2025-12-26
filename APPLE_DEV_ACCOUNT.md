# Apple Developer Account Requirements

## Short Answer

- **Preview/Development builds**: ❌ **No paid account needed** - Free Apple ID works
- **App Store submission**: ✅ **Yes, $99/year** required
- **TestFlight distribution**: ✅ **Yes, $99/year** required
- **Installing on your own iPad**: ❌ **No paid account needed** for development builds

## Detailed Breakdown

### Free Apple ID (No Cost)

You can use a **free Apple ID** for:

✅ **EAS Build preview/development builds**
- Build the app
- Download the .ipa file
- Install on your own devices (with limitations)

⚠️ **Limitations with free Apple ID:**
- Apps expire after **7 days** (need to reinstall)
- Limited to **3 apps** at a time
- Can only install on **your own devices**
- Cannot submit to App Store
- Cannot use TestFlight

### Paid Apple Developer Account ($99/year)

Required for:

✅ **App Store distribution**
- Submit apps to the App Store
- Distribute to unlimited users
- Apps don't expire

✅ **TestFlight**
- Beta testing with up to 10,000 testers
- Internal testing with your team

✅ **Production builds**
- Builds that don't expire
- Enterprise distribution (with Enterprise account)

## For Your Use Case

### Scenario 1: Just Testing on Your iPad Mini

**You DON'T need a paid account!**

1. Use EAS Build with preview profile:
   ```bash
   eas build --platform ios --profile preview
   ```

2. EAS will prompt you to sign in with your **free Apple ID**

3. Download the .ipa file

4. Install on iPad using:
   - **AltStore** (free, 7-day certificates)
   - **Sideloadly** (free, 7-day certificates)
   - Or other sideloading tools

5. **Note**: The app will expire after 7 days, then reinstall

### Scenario 2: Want to Keep App Permanently

**You need a paid account ($99/year)**

- Builds won't expire
- Can use TestFlight for easier installation
- Can submit to App Store if desired

### Scenario 3: Want to Distribute to Others

**You need a paid account ($99/year)**

- Required for App Store
- Required for TestFlight
- Required for any distribution beyond personal use

## EAS Build Profiles Explained

### Preview Profile (No Paid Account Needed)

```json
"preview": {
  "distribution": "internal",
  ...
}
```

- Uses free Apple ID
- 7-day expiration
- Personal use only

### Production Profile (Paid Account Required)

```json
"production": {
  "distribution": "store",
  ...
}
```

- Requires paid Apple Developer account
- For App Store submission
- No expiration

## Alternative: Use Web App (No Account Needed!)

Remember, you already have a **working web app (PWA)** that:
- ✅ Works perfectly on iPad
- ✅ Can be added to home screen
- ✅ Feels like a native app
- ✅ **No Apple Developer account needed**
- ✅ **No expiration**
- ✅ **Free forever**

This is often the best option for personal use!

## Cost Comparison

| Option | Cost | Expiration | Distribution |
|--------|------|------------|--------------|
| **Web App (PWA)** | Free | Never | Personal use |
| **EAS Preview Build** | Free | 7 days | Personal use |
| **EAS Production Build** | $99/year | Never | App Store |
| **TestFlight** | $99/year | Never | Beta testing |

## Recommendation

For your situation:

1. **Start with the web app** - It's already working and free!
2. **If you want native features**, try EAS Build preview (free Apple ID)
3. **If you need permanent installation**, consider the $99/year account

## How to Use Free Apple ID with EAS Build

When you run:
```bash
eas build --platform ios --profile preview
```

EAS will:
1. Ask you to sign in (use your free Apple ID)
2. Create a temporary certificate (valid 7 days)
3. Build your app
4. Provide download link

You can do this repeatedly - just rebuild every 7 days if needed.

## Bottom Line

**For testing on your iPad Mini right now**: No paid account needed! Use the preview profile with a free Apple ID.

**For App Store or permanent distribution**: Yes, you need the $99/year account.

