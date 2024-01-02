import bcrypt from "bcrypt";
import { capitaliseUserName } from "./Employee.controller.js";
import Employee from "../model/Employee.model.js";

export const hashPassword = async (pass) => {
  try {
    const saltRounds = 10;
    const hashedPassowrd = await bcrypt.hash(pass, saltRounds);
    return hashedPassowrd;
  } catch (err) {}
};

export const verfyPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (err) {}
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const capUsername = capitaliseUserName(username);

    const emp = await Employee.findOne({ username: capUsername });
    const isMatch = await verfyPassword(password, emp.password);  

    if (isMatch) {
      res.send(emp);
      return;
    }

    res.status(400).json({ msg: "Bad username or password!" });
  } catch (err) {
    console.error(err.message);
  }
};

// add jwt
