//IMPORTING THE DOCUMENT TYPE OF USER ENTITY
import { IEmployeeDocument, IEmployeeModel } from "../../src/models/employee";

//EXTENDING EXPRESS REQUEST TO CONTAIN USER AND TOKEN PROPERTIES
declare module "express-serve-static-core" {
  namespace Express {
    interface Request {
      employee: IEmployeeDocument;
    }
    interface Request {
      token: string;
    }
  }
}
