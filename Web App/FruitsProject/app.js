//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

//Fruit
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema)
//o primeiro parâmetro é o nome da collection. Colocamos no singular ("Fruit"), mas o mongoose automaticamente coloca no plural. Então, na nossa database aparece como "fruits"

const fruit = new Fruit ({
  name: "Peach",
  rating: 10,
  review: "Peaches are so yummy"
})

//fruit.save();

//Person
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema)

const mango = new Fruit ({
  name: "Mango",
  score: 6,
  review: "Decent fruit."
})

//mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated the document")
  }
});

// const person = new Person ({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// });
//
// person.save();


//person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Too sour for me"
});

const banana = new Fruit({
  name: "Banana",
  score: 3,
  review: "Weird texture"
});


// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB")
//   }
// })

Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    })
  }
})

// Fruit.updateOne({_id: "60926373767d8f2a2b2ac01d"}, {name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document.")
//   }
// })


// Fruit.deleteOne({ _id: "60925832c76bd62835631d0b"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document.")
//   }
// });

// Person.deleteMany({ name: "John"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted all the documents.")
//   }
// });

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    { name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
