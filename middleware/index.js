//all middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");


 var middlewareObj= {};

middlewareObj.checkCampgroundOwnership= function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			//does user own the campground
			if(foundCampground.author.id.equals(req.user._id)){
				//res.render("campgrounds/edit", {campground:foundCampground});
				next();
			}else{
				//res.send("You Do not have the permission");
				res.redirect("back");
			}
			
		}
	});	
	}else{
		req.flash("error", "You Need To Be Logged In To Do That!");
		res.redirect("back");
	}
}
middlewareObj.checkCommentOwnership= function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			req.flash("error", "campgrounds not found");
			res.redirect("back");
		}else{
			//does user own the comment
			if(foundComment.author.id.equals(req.user._id)){
				//res.render("campgrounds/edit", {campground:foundCampground});
				next();
			}else{
				req.flash("error", "You Do Not Have Permission To Do That");
				res.redirect("back");
			}
			
		}
	});	
	}else{
		 req.flash("error", "You Need To Be Logged In To Do That!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "You Need To Be Logged In To Do That!");
    res.redirect("/login");
}
module.exports= middlewareObj