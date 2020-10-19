#!/usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");

const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
} = require("./index");

//Customer Question
const questions = [
  {
    type: "input",
    name: "firstname",
    message: "Customer Frist Name",
  },
  {
    type: "input",
    name: "lastname",
    message: "Customer Last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Addreas",
  },
];

program.version("1.0.0").description("Client Management System");

// add commands all arguments
// program
//   .command("add <firstname> <lastname> <phone> <email>")
//   .alias("a")
//   .description("Add a customer")
//   .action((firstname, lastname, phone, email) => {
//     addCustomer({ firstname, lastname, phone, email });
//   });

// Add command
program
  .command("add")
  .alias("a")
  .description("Add a customer")
  .action(() => {
    prompt(questions).then((answers) => addCustomer(answers));
  });

// Find Command
program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => findCustomer(name));

// Update Command
program
  .command("update <_id>")
  .alias("u")
  .description("Update a customer")
  .action((_id) => {
    prompt(questions).then((answers) => updateCustomer(_id, answers));
  });

// Remove Command
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a customer")
  .action((_id) => removeCustomer(_id));

// List Command
program
  .command("list")
  .alias("l")
  .description("List all customers")
  .action(() => listCustomers());

program.parse(process.argv);
