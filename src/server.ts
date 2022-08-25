import app from "./app";
import { BUREAU_DATA, SEED_EMPLOYEE_DATA } from "./config";
import { BureauModel } from "./models/bureau";
import { EmployeeModel } from "./models/employee";
import models from "./models";
import { DesignationModel } from "./models/designation";
import { DESIGNATIONS } from "./middlewares/constants";

const PORT = parseInt(process.env.PORT || "8000");

app.listen(PORT, async () => {
  require("./db");
  await Promise.all(
    models.map(async (model: any) => {
      await model.init();
    })
  );
  if ((await DesignationModel.find()).length === 0) {
    await Promise.all(
      DESIGNATIONS.map(async (name: string) => {
        const designation = new DesignationModel({ name });
        await designation.save();
      })
    );
  }
  if ((await BureauModel.find()).length === 0) {
    await Promise.all(
      BUREAU_DATA.map(async (bureau: String) => {
        const Bureau = new BureauModel({ name: bureau });
        await Bureau.save();
      })
    );
  }
  if ((await EmployeeModel.find()).length === 0) {
    const employee = new EmployeeModel(SEED_EMPLOYEE_DATA);
    await employee.save();
  }

  console.log(`DB connected and server running @ localhost:${PORT}/graphl`);
});
