export { }

declare global {
    namespace Express {
        interface Request {
            session: {
                user: any,
                userType: string,
                destroy: () => void
            }
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECTION: any;
        }
      }

}