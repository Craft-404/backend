import app from "./app";
import { BUREAU_DATA, SEED_EMPLOYEE_DATA } from "./config";
import { BureauModel } from "./models/bureau";
import { EmployeeModel } from "./models/employee";

const PORT = parseInt(process.env.PORT || "8000");

app.listen(PORT, async () => {
  require("./db");
  await EmployeeModel.init();
  if ((await EmployeeModel.find()).length === 0) {
    const employee = new EmployeeModel(SEED_EMPLOYEE_DATA);
    await employee.save();
  }
  if ((await BureauModel.find()).length === 0) {
    await Promise.all(
      BUREAU_DATA.map(async (bureau: String) => {
        const Bureau = new BureauModel({ name: bureau });
        await Bureau.save();
      })
    );
  }
  console.log(`DB connected and server running @ localhost:${PORT}/graphl`);
});
