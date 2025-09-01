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

customerSchema.pre("findOneAndDelete", async (data) => {
    console.log(data);
    console.log("I'm Pre MiddleWare");
})

customerSchema.post("findOneAndDelete", async (customer) => {
    console.log("Post Middleware");
    if(customer.orders.length){
        let res = await order.deleteMany({_id: { $in: customer.orders }});
        console.log(res);
    }

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


const addCustomer = async() => {
    let cust2 = new customer({
        name: "Tony Stark"
    }) 

    let order2 = new order({
        item: "Pizza",
        price: 399,
    })


    cust2.orders.push(order2);

    await order2.save();
    await cust2.save();

    console.log("Done");
}

// addCustomer();

// let custFind = async () => {
//     let result = await customer.find({})
//     console.log(result[0])
// };

// custFind();



// // Handling Deletion 
const delCust = async () => {
    let data = await customer.findByIdAndDelete("68b41a5285b58eac073ba1df");
    console.log(data);
}

delCust();
