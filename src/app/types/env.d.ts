/* .envの内容に型付け*/

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DIRECT_URL: string;
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

export {};
