declare global {
	namespace NodeJS {
	  interface ProcessEnv {
		SERVER_PORT: string;
		DB_HOST: string;
		DB_PORT: string;
		DB_NAME: string;
		DB_USER: string;
		DB_PASS: string;
		SECRET: string;
	  }
	}
}

export {}