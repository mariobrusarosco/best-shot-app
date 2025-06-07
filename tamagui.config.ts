import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const tamaguiConfig = createTamagui(defaultConfig);

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
