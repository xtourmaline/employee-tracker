const { table } = require("table");
const mysql = require('mysql2/promise');
const { default: inquirer } = require("inquirer");

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
    
    const options = {
        name: "task",
        type: "",

    }

    const results = await db.query("SELECT * FROM DEPARTMENT");
    console.log(results);
};

init();