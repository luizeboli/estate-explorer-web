declare namespace NodeJS {
	interface ProcessEnv {
		WP_HOST_URL: string;
		WP_IMAGES_HOST: string;
		VERCEL_URL: string;
		NEXT_PHASE: string;
	}
}
