const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require('figlet');

figlet('Employee Tracker', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "employeeTrack_db"
});

connection.connect(function (err) {
    if (err) throw (err);
    init();
})


const init = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What Would you like to choose",
            choices: ["Add departments", "Add roles", "Add employees",
                "View departments", "View roles", "View employees",
                "Update employee roles", "END"],
            name: "choices"
        }]
    ).then(async (ansChoice) => {
        switch (ansChoice.choices) {
            case "Add departments":
                addDep()
                break;
            case "Add roles":
                addrol()
                break;
            case "Add employees":
                addemploy();
                break;
            case "View departments":
                viewDep()
                break;
            case "View roles":
                viewRole()
                break;
            case "View employees":
                viewEmploy()
                break;
            case "Update employee roles":
                updateEmpRole()
                break;
            default:
                connection.end();
        }
    })
}
function addDep() {
    inquirer.prompt([
        {
            type: "input",
            message: "What would you like to name the department",
            name: "newDep"
        }
    ]).then(function (name) {
        console.log("inserting a new Department....\n");

        connection.query(
            "INSERT INTO departments SET ?",
            {
                name: name.newDep
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department created\n");
                init();
            }
        )
    })

}
const addrol = async () => {
    connection.query("SELECT * FROM departments",
        async (err, results) => {
            if (err) throw err
            const depChoices = await results.map(({ id, name }) => ({ name: name, value: id }))
            inquirer.prompt([
                {
                    type: "input",
                    message: "what roles would you like to add?",
                    name: "newrole"
                },
                {
                    type: "input",
                    message: "how much should this role make?",
                    name: "salary"
                },
                {
                    type: 'list',
                    name: 'dep',
                    message: 'Which department does this user belong to?',
                    choices: await depChoices,
                }
            ]).then(async (name) => {
                console.log("inserting a new Role....\n");
                connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        title: name.newrole,
                        salary: name.salary,
                        departments_id: name.dep
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " role created\n");
                        init();
                    }
                )
            })
        }
    )
}
const addemploy = async () => {
    connection.query("SELECT * FROM roles",
        async (err, results) => {
            if (err) throw err
            const rolChoice = await results.map(({ id, title }) => ({ name: title, value: id }))
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the First Name?",
                    name: "employFirst"
                },
                {
                    type: "input",
                    message: "what is the Last Name?",
                    name: "employLast"
                },
                {
                    type: "list",
                    message: "What role will this employee have?",
                    choices: await rolChoice,
                    name: "roleChoice"
                }
            ]).then(async (name) => {
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: name.employFirst,
                        last_name: name.employLast,
                        roles_id: name.roleChoice
                    },
                    function (err, res) {
                        if (err) throw err;
                        res.affectedRows;
                        init();
                    }
                )
            })
        })
}


function viewDep() {
    connection.query("SELECT * FROM departments",
        async (err, results) => {
            if (err) throw err
            console.table(results)
            init()
        }
    )
}
function viewRole() {
    connection.query("SELECT * FROM roles",
        async (err, results) => {
            if (err) throw err
            console.table(results)
            init()
        }
    )
}
function viewEmploy() {
    connection.query("SELECT * FROM employee",
        async (err, results) => {
            if (err) throw err
            console.table(results)
            init()
        }
    )
}
function updateEmpRole() {
    connection.query("SELECT * FROM employee",
        async (err, results) => {
            if (err) throw err
            const employee = await results.map(({ id, first_name }) => ({ name: first_name, value: id }))

            inquirer.prompt([

                {
                    type: "list",
                    message: "Which employee for the new role",
                    choices: await employee,
                    name: "name"
                },
                {
                    type:"input",
                    message:"What role would you like this person to have",
                    name:"newRole"
                }
            ]).then(async (name) => {
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    {
                        roles_id:name.newRole
                    }, 
                    {
                        first_name:name.name
                    },
                    function (err, res) {
                        if (err) throw err;
                        res.affectedRows;
                        init();
                    }
                )
            })
        })
}

