//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const homeStartingContent = "Hey there , here are my some of the self written works . It includes Ghazals , Nazms , and some other poetic works . I hope you will like them . For any suggestions , I will be more than obliged to get your message ! Contact links are provided in the CONTACT section . Well Happy Reading :) ";
const aboutContent = "Hey reader , this is Aditesh Upadhyay . I am from India , country of - colours , culture and fun . I am persuing my bachelor of technology in Electronics and Communication Engineering from Indian Institute of Technology (IIT(ISM)) Dhanbad . I have poetry as my hobby apart from gymming , football , singing , chess and exploring technology ! The whole intention of developing this web post was to share my hindi poetries , which include Ghazals , Nazams , Stories , Narrations and some Shayaris ! . I will be also sharing my experience as an engineering student at IIT over this blog post . I am always open for suggestions , feedbacks and comments ! HAPPY READING ! ❤⭐ ";
const contactContent = "If you have any suggestion , feedback , question , or just want to share your experience of reading these writings ! Feel free to contact me ! I will be more than happy to here from your side! Here are my links of social media handle : ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log(`Server started on port 3000`);
});
