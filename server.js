
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let employees = [
    { id: 1, name: "Rahul Sharma", department: "Engineering", status: "Active" },
    { id: 2, name: "Priya Patel", department: "HR", status: "Active" },
    { id: 3, name: "Amit Verma", department: "Engineering", status: "Inactive" }
];

let nextId = 4;

app.get("/employees", (req, res) => {
    let result = employees;

    if (req.query.department) {
        result = employees.filter(
            employee =>
                employee.department.toLowerCase() ===
                req.query.department.trim().toLowerCase()
        );
    }

    res.status(200).json(result);
});

app.get("/employees/:id", (req, res) => {
    const id = Number(req.params.id);

    const employee = employees.find(emp => emp.id === id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid employee ID" });
    }

    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
});

app.post("/employees", (req, res) => {
    const { name, department } = req.body || {};

    if (typeof name !== "string" || !name.trim() ||
        typeof department !== "string" || !department.trim()) {
        return res.status(400).json({
            message: "Name and department are required"
        });
    }

    const employee = {
        id: nextId++,
        name: name.trim(),
        department: department.trim(),
        status: "Active"
    };

    employees.push(employee);

    res.status(201).json(employee);
});

app.patch("/employees/:id/status", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid employee ID" });
    }

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }

    const { status } = req.body || {};

    if (status !== "Active" && status !== "Inactive") {
        return res.status(400).json({
            message: "Status must be Active or Inactive"
        });
    }

    employee.status = status;

    res.status(200).json(employee);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
