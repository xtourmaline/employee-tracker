const { table } = require("table");

async function viewAllDepartments(db) {
    const data = (await db.query(
        `SELECT * FROM department`
    ))[0];
    const departments = data.map (row => Object.values(row));

    departments.unshift(["id", "department"]);
    console.log(table(departments));
}

async function viewAllRoles(db) {
    const data = (await db.query(
        `SELECT r.id, r.title, d.name, r.salary
        FROM role r
        JOIN department d
        ON r.department_id = d.id`
    ))[0];
    const roles = data.map (row => Object.values(row));

    roles.unshift(["id", "title", "department", "salary"]);
    console.log(table(roles));
}

async function viewAllEmployees(db) {
    const data = (await db.query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, concat(m.first_name, " ", m.last_name)
        FROM employee e
        JOIN role r ON r.id = e.role_id
        JOIN department d ON d.id = r.department_id
        LEFT JOIN employee m ON m.id = e.manager_id;`
    ))[0];
    const employees = data.map (row => Object.values(row));

    employees.unshift(["id", "first name", "last name", "title", "department", "salary", "manager"]);
    console.log(table(employees));
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees
};