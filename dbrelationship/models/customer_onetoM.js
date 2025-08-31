// One to Many
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String, 
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order', }]
})


const order = mongoose.model("Order", orderSchema);
const customer = mongoose.model("Customer", customerSchema);

// const addOrders = async () =>{
//     let res = await order.insertMany([
//         { item: "Samosa", price: 12},
//         { item: "Juice", price: 29},
//         { item: "Chocolate", price: 40},
//     ])
//     console.log(res);
// };

// addOrders();


// const addCustomer = async() => {
//     let cust1 = new customer({
//         name: "Rami Malik"
//     }) 

//     let order1 = await order.findOne({item: "Samosa"});
//     let order2 = await order.findOne({item: "Juice"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     console.log(cust1);

//     let result = await cust1.save();
//     console.log(cust1);
// }

// addCustomer();

let custFind = async () => {
    let result = await customer.find({})
    console.log(result[0])
};

custFind();
