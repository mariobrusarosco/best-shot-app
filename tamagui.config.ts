import { config } from "@tamagui/config/v2"; // Using v2 as per common examples, will adjust if v4 is specifically needed by latest tamagui
import { createTamagui } from "tamagui";

const tamaguiConfig = createTamagui(config);

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
