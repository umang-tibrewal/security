//jshint esversion:6

require("dotenv").config();

const express=require("express");


const bodyParser=require("body-parser");

const  mongoose =require("mongoose");

const ejs=require("ejs");



const app= express();


const encrypt=require("mongoose-encryption");

app.use(express.static("public"));

app.set('view engine','ejs');




mongoose.connect("mongodb://localhost:27017/users");
app.use(bodyParser.urlencoded({extended:true}));



const userSchema=new mongoose.Schema({


  email:String,

  password:String


});



userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});



const user=new mongoose.model("user",userSchema);


app.get("/",function(req,res){



res.render("home");





});

app.get("/register",function(req,res){



res.render("register");





});


app.get("/login",function(req,res){




  res.render("login");
})



app.post("/register",function(req,res){


const  newuser= new user({

  email:req.body.username,

  password:req.body.password
});


newuser.save(function(err){
if(err){
  console.log(err);
}


else{


res.render("secrets");

}

})




})


app.post("/login",function(req,res){

const emai=req.body.username;

const passwor=req.body.password;


user.findOne({email:emai},function(err,user)
{
if(err){


  console.log(err);
}


else{

if(passwor===user.password){


  res.render("secrets");
}



else{



  res.render("home");
}

}




})



})




app.listen(3000,function(){

  console.log("server statred at port 3000");
})
