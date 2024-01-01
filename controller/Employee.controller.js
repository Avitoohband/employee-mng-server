import Employee from "../model/Employee.model.js";

export const getEmployee = async (req, res) => {
  try {
    const { username } = req.params;
    const emp = await Employee.findOne({ username: username });
    if (emp === null) {
      res.status(204);
      return;
    }

    res.send(emp);
  } catch (err) {
    res.status(409).json("Error has occured: " + err.message);
  }
};

export const getEmployees = async (req, res) => {
  try {
    const emps = await Employee.find();
    if (emps.length === 0) {
      res.status(204).send("Employee is not exists!");
      return;
    }
    res.send(emps);
  } catch (err) {
    res.status(409).json("Error has occured: " + err.message);
  }
};

export const createEmployee = async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();

    res.status(201).json(emp);
  } catch (err) {
    res.status(409).json("Error has occured: " + err.message);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { username } = req.body;
    console.log(username);

    const emp = await Employee.findOne({ username: username });
    console.log(emp);
    if (emp === null) {
      res.status(204).send("Employee is not exists!");
      return;
    }

    Object.assign(emp, req.body);

    await emp.save();

    res.send(emp);
  } catch (error) {
    res.status(409).json("Error has occured: " + err.message);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { username } = req.params;

    const emp = await Employee.findOneAndDelete({ username: username });

    if (emp === null) {
      res.status(204).send("Employee is not exists!");
      return;
    }

    res.send(emp + "\n" + "is Deleted!");
  } catch (err) {
    res.status(409).json("Error has occured: " + err.message);
  }
};
