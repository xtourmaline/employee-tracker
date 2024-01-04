const inquirer = require("inquirer");
const { table } = require("table");

async function addDepartment(db) {
    const info = (await inquirer.prompt(
        [
            {
                name: "department",
                type: "input",
                message: "What is the name of the department?"
            },
            {
                name: "confirmation",
                type: "list",
                message: "Confirm",
                choices: ["yes", "no"]
            }
        ]
    ));

    if (info.confirmation == "yes") {
        await db.query(
            `INSERT INTO department (name)
            VALUE ("${info.department}")
            `
        );
        console.log(`Added ${info.department} to the database`)
    } else if (info.confirmation == "no") {
        addDepartment(db)
    }
}

async function addRole(db) {
    const data = ((await db.query(
        `SELECT name FROM department`
    ))[0]);

    const department = data.map(obj => obj.name);

    const info = (await inquirer.prompt(
        [
            {
                name: "role",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "salary",
                type: "number",
                message: "What is the salary of the role?"
            },
            {
                name: "department",
                type: "list",
                message: "What department does the role belong to?",
                choices: department
            },
            {
                name: "confirmation",
                type: "list",
                message: "Confirm?",
                choices: ["yes", "no"]
            }
        ]
    ));

    // if (info.confirmation == "yes") {
    //     await db.query(
    //         `INSERT INTO department (name)
    //         VALUE ("${info.department}")
    //         `
    //     );
    //     console.log(`Added ${info.department} to the database`)
    // } else if (info.confirmation == "no") {
    //     addDepartment(db)
    // }
}

async function addEmployee(db) {
    
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee
}