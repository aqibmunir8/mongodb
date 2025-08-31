// One to Few RelationShip | Approach 1 (one to few)
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// Subdocument schema without _id
const addressSchema = new Schema(
  {
    location: String,
    city: String,
  },
  { _id: false }
);

const userSchema = new Schema({
  userName: String,
  addresses: [addressSchema],
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
  let user1 = new User({
    userName: "SherlockHolmes",
    addresses: [
      {
        location: "b72 Baker Street",
        city: "London",
      },
    ],
  });

  user1.addresses.push({
    location: "P43 New York Road 190 Block-109",
    city: "New York",
  });

  let result = await user1.save();
  console.log(result);
};

addUser();
