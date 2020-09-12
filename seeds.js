var mongoose= require("mongoose");
var Campground= require("./models/campground");
var Comment=require("./models/comment");
// var data=[
// 	{name:"Cloud's Rest",
// 	 image:"https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-1.2.1&w=1000&q=80",
// 	 Description:"Beautiful clouds are soo soothing"
// 	},
// 	{
// 		name:"Desert Mesa",
// 		image:"https://m.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/03/31/Pictures/_0abf43c2-34d5-11e8-8c5f-3c6cc031651e.jpg",
// 		Description:"Sahara is the largest dessert in the world"
// 	},
// 	{
// 		name:"Canyon Floor",
// 		image:"https://image.freepik.com/free-photo/camping-forest_1426-950.jpg",
// 		Description:"Aamazing canyon floors are located on the foothills of mother nature"
// 	}
// ]



function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;