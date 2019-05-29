
export class LoginError extends Error {
    
    public invalid_password: string;
    public no_such_user: string;   
    
    constructor(msg) {
      super(msg);     
    }
  }
