const inquirer = require("inquirer");

// Adds a department into the SQL database
// Has a confirmation prompt which recurses the function should they press "no"
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
        await addDepartment(db);
    }
}

// Adds a role into the SQL database.
// Prompts for a lot of info regarding the role, like
// salary, name, and the department it belongs in.
async function addRole(db) {
    // Grabs a list of all departments and formats them for inquirer
    const data = (await db.query(
        `SELECT name FROM department`
    ))[0];

    const departments = data.map(obj => obj.name);

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
                choices: departments
            },
            {
                name: "confirmation",
                type: "list",
                message: "Confirm?",
                choices: ["yes", "no"]
            }
        ]
    ));

    // Ensure info.salary is a number, because sometimes Inquirer will return a NaN.
    if (info.confirmation === "yes" && Number.isInteger(info.salary)) {
        await db.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES ("${info.role}", ${info.salary}, (SELECT id FROM department WHERE name = "${info.department}"));
            `
        );
        console.log(`Added ${info.role} to the database`)
    } else if (info.confirmation === "no") {
        await addRole(db)
    } else if (isNaN(info.salary)) {
        console.log("Not a valid number. Please try again.");
        await addRole(db);
    }
}

// Adds an employee to the database.
// Prompts for the employee name and role.
async function addEmployee(db) {
    // Pre-emptively grabs roles for inquirer formatting.
    const dataRoles = ((await db.query(
        `SELECT title FROM role`
    ))[0]);

    const roles = dataRoles.map(obj => obj.title);
    
    const info1 = (await inquirer.prompt(
        [
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: roles
            }
        ]
    ));

    // I liked this code but I'm trying to follow the demo video, which seems to print all, 
    // irrespective of their roles, so I will do that as well. :D
    // 
    //const dataManagers = ((await db.query(
    //    `SELECT CONCAT(m.first_name, " ", m.last_name) AS manager_name
    //    FROM employee m
    //    JOIN role r ON m.role_id = r.id
    //    WHERE m.manager_id IS NULL
    //    AND r.department_id = (SELECT department_id FROM role WHERE title = "${info1.role}");
    //    `
    //))[0]);

    // Grabs for inquirer.
    const dataManagers = (await db.query(
        `
        SELECT CONCAT(first_name, " ", last_name) AS manager_name
        FROM employee
        `
    ))[0];

    const managers = dataManagers.map(obj => obj.manager_name);
    managers.unshift("None");

    const info2 = (await inquirer.prompt(
        [
            {
                name: "manager",
                type: "list",
                message: "What is the employee's manager?",
                choices: managers
            },
            {
                name: "confirmation",
                type: "list",
                message: "Confirm?",
                choices: ["yes", "no"]
            }
        ]
    ));

    // Handles the case where the employee does not have a manager
    const managerID = info2.manager === "None"
        ? "NULL" 
        : (await db.query(`(SELECT id FROM employee
            WHERE CONCAT(first_name, " ", last_name) = "${info2.manager}")`))[0][0].id;

    if (info2.confirmation === "yes") {
        await db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (
                "${info1.first_name}",
                "${info1.last_name}",
                (SELECT id FROM role WHERE title = "${info1.role}"),
                ${managerID}
            );`
        );
        console.log(`Added ${info1.first_name} ${info1.last_name} to the database`)
    } else if (info2.confirmation === "no") {
        await addEmployee(db);
    }
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee
}