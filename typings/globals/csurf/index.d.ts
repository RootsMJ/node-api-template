// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/c968762595456c86498fc38c340d2b94acec00fd/csurf/index.d.ts
declare namespace Express {
  export interface Request {
    csrfToken(): string;
  }
}

declare module "csurf" {
  import express = require('express-serve-static-core');

  function csurf(options?: {
    value?: (req: express.Request) => string;
    cookie?: csurf.CookieOptions | boolean;
    ignoreMethods?: string[];
    sessionKey?: string;
  }): express.RequestHandler;

  namespace csurf {
    export interface CookieOptions extends express.CookieOptions {
      key: string;
    }
  }

  export = csurf;
}
