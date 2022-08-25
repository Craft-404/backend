//IMPORTING THE DOCUMENT TYPE OF USER ENTITY
import { IEmployeeDocument, IEmployeeModel } from "../../src/models/employee";
import { IUser, IUserDocument, IUserModel } from "../../src/models/user";

//EXTENDING EXPRESS REQUEST TO CONTAIN USER AND TOKEN PROPERTIES
declare module "express-serve-static-core" {
  namespace Express {
    interface Request {
      employee: IEmployeeDocument;
    }
    interface Request {
      token: string;
    }
    interface Request {
      user: IUserDocument;
    }
  }
}
