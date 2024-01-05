const inquirer = require("inquirer");
const { table } = require("table");

async function updateEmployeeRole(db) {
    const dataNames = ((await db.query(
        `SELECT CONCAT(first_name, " ", last_name) AS name
        FROM employee`
    ))[0]);

    const names = dataNames.map(obj => obj.name);
    names.unshift("None");

    const employee = (await inquirer.prompt(
        [
            {
                name: "employee",
                type: "list",
                message: "Which employee's role do you want to update?",
                choices: names
            },

        ]
    ));

    if (employee.employee === "None") {
        return;
    }

    const dataRoles = ((await db.query(
        `SELECT title FROM role r
        WHERE r.id != (SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = "${employee.employee}")`
    ))[0]);

    const roles = dataRoles.map(obj => obj.title);

    const updatedRole = (await inquirer.prompt(
        [
            {
                name: "role",
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                choices: roles
            }
        ]
    ));

    /*
    I tried to use this original SQL query, which worked in workstation, but would not work in JS, no matter what I tried to do. That is why I need to do multiple queries like this to get the information I need:

    await db.query(
        // This here was needed because workstation was complaining about safe update mode or something.
        `SET @emp_id = (SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = "${employee.employee}");

        UPDATE employee
        SET role_id = (SELECT id FROM role WHERE title = "${updatedRole.role}")
        WHERE id = @emp_id;`
    );
    */
    const employeeID = (await db.query(
        `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = "${employee.employee}";
        `
    ))[0][0].id;

    const roleID = (await db.query(
        `SELECT id FROM role WHERE title = "${updatedRole.role}";
        `
    ))[0][0].id;

    await db.query(
        `
        UPDATE employee
        SET role_id = ${roleID}
        WHERE id = ${employeeID};
        `
    );

    console.log(`Updated ${employee.employee}'s role to ${updatedRole.role}.`);
}

module.exports = {
    updateEmployeeRole
}