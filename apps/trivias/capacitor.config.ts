import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'trivias',
  webDir: '../../dist/apps/trivias/browser',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
