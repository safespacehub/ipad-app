import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flightlog.ipad',
  appName: 'Flight Log',
  webDir: 'dist',
  server: {
    android: {
      allowMixedContent: true,
    },
    ios: {
      allowMixedContent: true,
    },
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      spinnerColor: '#007aff',
    },
  },
};

export default config;

