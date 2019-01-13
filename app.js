var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require('method-override');
    
// mongoose.connect("mongodb://localhost:27017/diary_with_summary_app", {useNewUrlParser: true});
mongoose.connect("mongodb://anna:yyqx1128@ds255784.mlab.com:55784/diary", {useNewUrlParser: true});
// anna yyqx1128
// mongodb://<dbuser>:<dbpassword>@ds255784.mlab.com:55784/diary
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

var diarySchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    summary: String,
    created:  {type: Date, default: Date.now}
});

var Diary = mongoose.model("Diary", diarySchema);

app.get("/", function(req, res){
    res.redirect("/welcome");
});

app.get("/welcome", function(req, res){
    res.render("welcome");
});

app.get("/diaries", function(req, res){
    Diary.find({}, function(err, diaries){
        if(err){
            console.log(err);
        } else {
            res.render("index", {diaries: diaries}); 
        }
    })
});

app.get("/diaries/new", function(req, res){
   res.render("new"); 
});

app.post("/diaries", function(req, res){
    req.body.diary.body = req.sanitize(req.body.diary.body);
   var formData = req.body.diary;
   Diary.create(formData, function(err, newDiary){
       console.log(newDiary);
      if(err){
          res.render("new");
      } else {
          res.redirect("/diaries");
      }
   });
});

app.get("/diaries/:id", function(req, res){
   Diary.findById(req.params.id, function(err, diary){
      if(err){
          res.redirect("/");
      } else {
          res.render("show", {diary: diary});
      }
   });
});

app.get("/diaries/:id/edit", function(req, res){
   Diary.findById(req.params.id, function(err, diary){
       if(err){
           console.log(err);
           res.redirect("/")
       } else {
           res.render("edit", {diary: diary});
       }
   });
});

app.put("/diaries/:id", function(req, res){
   Diary.findByIdAndUpdate(req.params.id, req.body.diary, function(err, diary){
       if(err){
           console.log(err);
       } else {
         var showUrl = "/diaries/" + diary._id;
         res.redirect(showUrl);
       }
   });
});

app.delete("/diaries/:id", function(req, res){
   Diary.findById(req.params.id, function(err, diary){
       if(err){
           console.log(err);
       } else {
           diary.remove();
           res.redirect("/diaries");
       }
   }); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
})
