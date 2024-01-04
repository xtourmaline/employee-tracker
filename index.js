const mysql = require('mysql2/promise');
const inquirer = require("inquirer");

const view = require("./lib/view");
const add = require("./lib/add");
const update = require("./lib/update");

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
    
    while (true) {
        const choice = (await inquirer.prompt({
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
        })).task;
    
        if (choice === "View All Employees") {
            await view.viewAllEmployees(db);
        } else if (choice === "View All Role") {
            await view.viewAllRoles(db);
        } else if (choice === "View All Departments") {
            await view.viewAllDepartments(db);
        } else if (choice === "Add Department") {
            await add.addDepartment(db);
        } else if (choice === "Add Role") {
            await add.addRole(db);
        } else if (choice === "Add Employee") {
            await add.addEmployee(db);
        } else if (choice === "Update Employee Role") {
            await update.updateEmployeeRole(db);
        } else if (choice === "Quit") {
            console.log("Goodbye!");
            process.exit(0);
        }
    }

    //const results = await db.query("SELECT * FROM DEPARTMENT");
    //console.log(results);
};

init();