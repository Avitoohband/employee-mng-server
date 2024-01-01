import express from "express";
import bodyParser from "body-parser";
import { getEmployee, getEmployees, createEmployee, deleteEmployee, updateEmployee } from "../controller/Employee.controller.js"

const router = express.Router();
router.use(bodyParser.json());

router.get("/:username", getEmployee);

router.get("/", getEmployees);

router.post("/", createEmployee);

router.delete("/:username", deleteEmployee)

router.put("/", updateEmployee)

export default router;