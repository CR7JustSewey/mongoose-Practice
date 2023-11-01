const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongoosePracticeDB");

//Don't forget to write ---> mongoose.connection.close(); <--- after querying

//Creating Database with data validation
const footballerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:["true","Please Insert name pls"]
    },
    age:Number,
    rating:{
        type:Number,
        min:3,
        max:10
    }
});
const Footballer=mongoose.model("Footballer",footballerSchema);

//Creating Document and Saving to Collection 
const player1=new Footballer({
    name:"Cristiano Ronaldo",
    age:38,
    rating:7
});
// player1.save();

const player2=new Footballer({
    name:"Ibrahimovic",
    age:42,
    rating:3
});
// player2.save();

//Creating Documents and Saving to Collection
const newPlayers=[
    {
        name:"Messi",
        age:35,
        rating:8
    },
    {
        name:"Haaland",
        age:23,
        rating:5
    },
    {
        name:"Bellingham",
        age:20,
        rating:6
    }
];
// Footballer.insertMany(newPlayers).then(function(){
//     console.log("Added new players");
// })

//Reading Documents from Collection
async function readFootballers(){
    const footballers=await Footballer.find({});
    footballers.forEach(function(footballer){
        console.log(footballer);
        //console.log(footballer.name);
    })
}
readFootballers();

//Update Document from collection
async function updateFootballer(){
    const updatedfootballer=await Footballer.updateOne({name:"Bellingham"},{rating:7});
    console.log(updatedfootballer);
}
//updateFootballer();

//Delete Document from Collection
async function deleteFootballer(){
    const deletedfootballer=await Footballer.deleteOne({rating:3});
    console.log("Deleted one footballe");
}
//deleteFootballer();

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:["true","Please insert the food name"]
    },
    famousLocation:String,
    price:Number,
    wholikethisfood: footballerSchema
})

const Food=mongoose.model("Food",foodSchema);

const newFoods=[
    {
        name:"Pizza",
        famousLocation:"Italy",
        price:4000
    },
    {
        name:"Tuna",
        famousLocation:"Japan",
        price:5000
    },
]
// Food.insertMany(newFoods).then(function(){
//     console.log("Added new foods to collection of database");
// });

const food3=new Food({
    name:"Sea bass",
    famousLocation:"Turkey",
    price:6000,
    wholikethisfood: player1
});
food3.save().then(function(){
    mongoose.connection.close();
});//*****

//Don't forget to save document(eg.food3) after embedding document
