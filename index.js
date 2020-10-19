const mongoose = require("mongoose");

//map global promise - get rid of warning
mongoose.Promoise = global.Promise;
//conect to db
mongoose.connect("mongodb://localhost:27017/customercli", {
  // useMongoClient: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//import model
const Customer = require("./models/customer");

// add customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New Customer Added");
    mongoose.connection.close();
  });
};

//find Customer
const findCustomer = (name) => {
  //Make case insenitive
  const search = new RegExp(name, "i");
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
    (customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      mongoose.connection.close();
    }
  );
};

// Update Customer
const updateCustomer = (_id, customer) => {
  Customer.updateOne({ _id }, customer).then((customer) => {
    console.info("Customer Update");
    mongoose.connection.close();
  });
};

// Remove Customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then((customer) => {
    console.info("Customer Remove");
    mongoose.connection.close();
  });
};

// List Customer
const listCustomers = () => {
  Customer.find().then((customers) => {
    console.info(customers);
    console.info(`${customers.length} customers`);
    mongoose.connection.close();
  });
};

// Export all Methode
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
