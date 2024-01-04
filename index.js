const { table } = require("table");
const mysql = require('mysql2/promise');
const inquirer = require("inquirer");

const init = async () => {
    const db = await mysql.createConnection(
        {
            host:"localhost",
            user: "root",
            password: "blank123",
            database: "tracker_db"
        }
    );
    console.log("Connected to the tracker_db database.");
    
    const task = await inquirer.prompt({
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Role",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    });

    if (task.task === "View All Employees") {
        const data = (await db.query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, concat(m.first_name, " ", m.last_name)
        FROM employee e
        JOIN role r ON r.id = e.role_id
        JOIN department d ON d.id = r.department_id
        LEFT JOIN employee m ON m.id = e.manager_id;`))[0];
        const employees = data.map (row => Object.values(row));

        employees.unshift(["id", "first name", "last name", "title", "department", "salary", "manager"]);
        console.log(table(employees));
    } else if () {
        
    }

    //const results = await db.query("SELECT * FROM DEPARTMENT");
    //console.log(results);
};

init();