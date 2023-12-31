import Employee from "../model/Employee.model.js";
import { hashPassword } from "./Auth.js";

export const getEmployee = async (req, res) => {
  try {
    const username = capitaliseUserName(req.params.username);
    const emp = await Employee.findOne({ username: username });

    if (emp === null) {
      res.status(204);
      return;
    }

    res.send(emp);
  } catch (err) {
    res.status(409).send("Error has occured: " + err.message);
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
    const { username, password } = req.body;
    const hashedPassowrd = await hashPassword(password);

    const emp = new Employee({
      ...req.body,
      username: capitaliseUserName(username),
      password: hashedPassowrd,
    });

    await emp.save();

    res.status(201).json(emp);
  } catch (err) {
    res.status(409).json("Error has occured: " + err.message);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const username = capitaliseUserName(req.body.username);
    const emp = await Employee.findOne({ username: username });
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
    const username = capitaliseUserName(req.params.username);

    const emp = await Employee.findOneAndDelete({ username: username });

    if (emp === null) {
      res.status(204).send("Employee is not exists!");
      return;
    }

    res.send(emp);
  } catch (err) {
    res.status(409).json("Error has occured: " + err.message);
  }
};

export const capitaliseUserName = (username) => {
  return username.charAt(0).toUpperCase() + username.slice(1);
};
