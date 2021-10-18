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
  promptUser()
}


//_______VIEW ALL ROLES___________
viewRoles = () => {
  console.log('Showing all roles')
  promptUser()

}


//_______VIEW ALL EMPLOYEES___________
viewEmployees = () => {
  console.log('Showing all employees')
  promptUser()

}


//_______ADD A DEPARTMENT___________
addDeparment = () => {
  console.log('Add department')
  promptUser()

}


//_______ADD A ROLE___________
addRole = () => {
  console.log('Add Role')
  promptUser()

}


//_______ADD AN EMPLOYEE___________
addEmployee = () => {
  console.log('Add Employee')
  promptUser()

}


//_______UPDATE AN EMPLOYEE ROLE___________
updateEmployee = () => {
  console.log('Update Employee')
  promptUser()

}