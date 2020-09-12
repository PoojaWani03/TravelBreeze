var express= require("express");
var app= express();
var bodyParser= require("body-parser");
var mongoose= require("mongoose");
var flash= require("connect-flash");
var passport=require("passport");
var LocalStrategy = require("passport-local");
var methodOverride=require("method-override");
var Campground=require("./models/campground");
var User= require("./models/user"); 
var seedDB= require("./seeds");
var Comment=require("./models/comment");



//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

// var url= process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp"
// mongoose.connect(url);
mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb+srv://wdpooja:Ehmjalp2@cluster0-bn23b.mongodb.net/wdpooja?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true, useUnifiedTopology: true });
 // mongoose.connect("mongodb+srv://wdpooja:Ehmjalp2@cluster0-bn23b.mongodb.net/wdpooja?retryWrites=true&w=majority", {
 // useNewUrlParser: true,
 // 	useCreateIndex:true,
 // 	useUnifiedTopology: true
 // }).then(() =>{
 // 	console.log('connected to DB');
 // }).catch(err =>{
 // 	console.log('ERROR',err.message); 
 // });
//mongoose.connect(process.env.DATABASEURL , { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());
//seedDB();//seed database


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// app.listen(process.env.PORT||3000, process.env.IP, function(){
//    console.log("The YelpCamp Server Has Started!");
// });

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});