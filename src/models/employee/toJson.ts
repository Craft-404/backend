import { IEmployeeDocument } from ".";

const toJSON = function (this: IEmployeeDocument) {
  const employee = this;
  const employeeObject = employee.toObject();
  delete employeeObject.password;
  return employeeObject;
};

export default toJSON;
