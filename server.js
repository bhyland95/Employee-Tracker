const express = require('express');
const db = require('./db/connection');
const mysql = require('mysql2')
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    welcome();
  });
});

welcome = () => {
  console.log('************************');
  console.log('*                      *');
  console.log('*   Employee Tracker   *');
  console.log('*                      *');
  console.log('************************');
  promptUser()
}

// inquirer prompt for first action
const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ])
    .then((answers) => {
      switch (answers.choices) {
        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;

        case 'View all employees':
          viewEmployees();
          break;

        case 'Add a department':
          addDeparment();
          break;

        case 'Add a role':
          addRole();
          break;

        case 'Add an employee':
          addEmployee();
          break;

        case 'Update an employee role':
          updateEmployee();
          break;

        case 'Exit':
          break;
      }

    });
};

//_______VIEW ALL DEPARTMENTS___________
viewDepartments = () => {
  console.log('Showing all departments')
  const sql = `SELECT department.id AS id, department.name AS department 
               FROM department`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  })
  promptUser()
}


//_______VIEW ALL ROLES___________
viewRoles = () => {
  console.log('Showing all roles')

  const sql = `SELECT roles.id, roles.title, department.name AS department, roles.salary
               FROM roles
               INNER JOIN department ON roles.department_id = department.id`;




  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  })
  promptUser()

}


//_______VIEW ALL EMPLOYEES___________
viewEmployees = () => {
  console.log('Showing all employees')
  const sql = `
  SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN roles ON (roles.id = employee.role_id)
  INNER JOIN department ON (department.id = roles.department_id)
  ORDER BY employee.id;`;




  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  })
  promptUser()

}


//_______ADD A DEPARTMENT___________
addDeparment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDept',
      message: "What department do you want to add?",
      validate: addDept => {
        if (addDept) {
          return true;
        } else {
          console.log('Please enter a department');
          return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      db.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDept + " to departments!");

        viewDepartments();
      });
    });
};


//_______ADD A ROLE___________
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's title",
      name: "roleTitle"
    },
    {
      type: "input",
      message: "Enter the employee's salary",
      name: "roleSalary"
    },
    {
      type: "input",
      message: "Enter the employee's department ID",
      name: "roleDept"
    }
  ])
    .then(function (res) {
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
      const params = [res.roleTitle, res.roleSalary, res.roleDept];
      db.query(sql, params, (err, res) => {
        if (err) {
          throw err;
        }
        console.table(res);
       viewRoles()
      });
    });
}




//_______ADD AN EMPLOYEE___________
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role ID",
        name: "addRole"
      },
      {
        type: "input",
        message: "Enter the employee's manager ID",
        name: "addManager"
      }
    ])
    .then(function (res) {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [res.firstName, res.lastName, res.addRole, res.addManager];
      db.query(sql, params, (err, res) => {
        if (err) {
          throw err;
        }
        console.table(res);
        viewEmployees();
      });
    });
}


//_______UPDATE AN EMPLOYEE ROLE___________
updateEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's ID you want to be updated",
      name: "employeeID"
    },
    {
      type: "input",
      message: "Enter the new role ID for that employee",
      name: "newRole"
    }
  ])
  .then(function (res) {
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [ res.newRole,res.employeeID];
      
      db.query(sql, params, (err, res) => {
        if (err) {
          throw err;
        }
        console.table(res);
       viewEmployees();
      })
    });
  }