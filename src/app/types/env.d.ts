declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DIRECT_URL: string;
    }
  }
}

export {};
