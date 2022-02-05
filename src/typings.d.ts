export { }

declare module "patterns"

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
    interface MulterRequest extends Express.Request {
        file: any;
    }
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECTION: any;
        }
      }

}