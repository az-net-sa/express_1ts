const data = {};
data.employees = require('../model/employees.json');


const getAllEmps = (req, res) =>  (req, res) => {
    res.json(data.employees);
}

const postEmp = (req, res) =>  {
    const newEmployee = {
        "id": data.employees.length,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ msg: 'Please include a first and last name' });
    }

    data.employees.push(newEmployee);
    res.status( 201 ,data.employees);
}

const getEmp = (req, res)=> {
    const id = req.params.id;
    if (id < data.employees.length) {
        res.json(data.employees[id]);
    } else {
        res.json({ "error": "Employee not found" });
    }
}

module.exports = {
    getAllEmps,
    postEmp,
    getEmp
}