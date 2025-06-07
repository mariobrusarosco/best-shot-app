import Constants from "expo-constants";

// Environment configuration
export const ENV = {
  // API Configuration
  API_BASE_URL:
    Constants.expoConfig?.extra?.apiBaseUrl || "https://api.bestshot.app",

  // App Configuration
  APP_NAME: "Best Shot",
  VERSION: Constants.expoConfig?.version || "1.0.0",

  // Development flags
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,

  // Platform detection
  IS_WEB: Constants.platform?.web !== undefined,
  IS_IOS: Constants.platform?.ios !== undefined,
  IS_ANDROID: Constants.platform?.android !== undefined,
} as const;

export default ENV;
