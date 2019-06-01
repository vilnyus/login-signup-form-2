
export class LoginError extends Error {
    
    public invalid_password;
    public no_such_user;   
    
    constructor(msg) {
      super(msg);     
    }
  }
