const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');
const mongoSotre = require('connect-mongo')(session);
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const bodyParser = require("body-parser");
const config = require("../config");
const moment = require("moment");
//let urlEncodedParser = bodyParser.urlencoded({extended:false});
const saltRounds = 10;
let question_id = 0;
let answer_id = 0;
//let previousVote;
//const url = "mongodb://localhost:27017";
//const dbName = "test";
//const url = "mongodb+srv://Nischal:"+config["MONGO_DB"]["ATLAS_PASSWORD"]+"@cluster0-qraje.mongodb.net/test?retryWrites=true&w=majority"
let db;
const dbName = config.mongodb.dbName;
//console.log(dbName);
const url = `mongodb+srv://Nischal:${config.mongodb.atlasPassword}@cluster0-qraje.mongodb.net/test?retryWrites=true&w=majority`;

let store = new mongoSotre({
  url : url
})

let app = express();
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(session({
          secret : "takeAGuess" , 
          cookie : {
            maxAge : 1000 * 60 * 60 * 24
          },
          //store : store ,
          saveUninitialized : true , 
          resave : true}));

app.use(bodyParser.json());

mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) console.log("Error connecting to Database");
  else {
    console.log("Connected to Database");
    db = client.db(dbName);
  }
});

const wait = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

app.get("/getQuestions", (req, res) => {
  //let sess = req.session;
  db.collection("questions")
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(result[0]["title"]);
        res.json(result.reverse());
      }
    });
  //client.close();
});

app.get('/session',(req,res)=>{
  console.log(session.email);
  if(session.email) res.json(true);
  else res.json(false);
});

app.get('/sessionUser',(req,res)=>{
  if(session.username) res.json(session.username)
  else res.json("false");
})

app.post("/addQuestion", async (req, res) => {
  let datetime = moment().format("MMMM Do YYYY, h:mm a");
  let collection = db.collection("questions");
  collection
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray((err, result_find) => {
      if (err) console.log("Error getting max id");
      else {
        //console.log(result_find[0]['_id'] + 1);
        try {
          question_id = result_find[0]["_id"] + 1;
        } catch (err) {
          question_id = 0;
        }
      }
    });
  await wait(1000);
  collection.insertOne(
    {
      _id: question_id,
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      author: session.username,
      datetime: datetime,
      askorEdit: "Asked",
      answer_ids: [],
      reports : []
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json("Question Added Successfully!!!");
      }
      //console.log(question_id);
      //client.close();
    }
  );
});

app.post("/login", (req, res) => {
  
  let collection = db.collection("users");
  collection.findOne({ email: req.body.email }, (err, result) => {
    if (err) {
      res.json("Wrong email or password");
    } else {
      if (result == null) {
        res.json("Invalid Email ID");
      } else {
        bcrypt.compare(req.body.password,result.password,(err,same)=>{
          if(err) console.log("Error in comparing passwords");
          else{
            if(same){
              console.log(result.password);
              session.email = req.body.email; 
              session.username = result._id;
              //console.log(session.email);
              console.log("result"+result._id);
              res.json(result._id);
            }
            else{
              res.json("Wrong Password");
            }
          }
        });
      }
    }
  });
  //client.close()
});

//Try to improve code quality
app.post("/signup", (req, res) => {
  let collection = db.collection("users");
  collection.findOne({ _id: req.body.username }, (err, result) => {
    if (err) console.log(err);
    else {
      if (result != null) {
        res.json("Username not available , already taken");
      } else {
        collection.findOne({ email: req.body.email }, (err, result) => {
          if (err) console.log(err);
          else {
            if (result != null) {
              res.json(
                "Email ID already registered with us , please sign in with your credentials"
              );
            } else {
                bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
                  if(err) console.log("Error in hashing password");
                  else{
                    collection.insertOne(
                      {
                        _id: req.body.username,
                        email: req.body.email,
                        password: hash,
                      },
                      (err, result) => {
                        if (err) console.log(err);
                        else {
                          res.json(
                            "User Successfully registered , please sign in with your credentials"
                          );
                        }
                      }
                  );
                  }
                });
              }
            }
          });
        }
      }
    });
  });

app.get("/myQuestions/:user_id", (req, res) => {
  let collection = db.collection("questions");
  let user_id = req.params.user_id;
  //console.log(typeof id);
  collection.find({ author: user_id }).toArray((err, result) => {
    if (err) console.log("Error in finding my questions");
    else {
      res.json(result.reverse());
    }
  });
});

app.get('/logout',async (req,res)=>{
    session.email = null;
    await wait(100);
    session.username = null;
    await wait(100);
    res.json('Destroyed');
})

app.get("/question/:id", (req, res) => {
  let collection = db.collection("questions");
  let id = parseInt(req.params.id);
  //console.log(typeof id);
  collection.findOne({ _id: id }, (err, result) => {
    if (err) console.log("Error in finding the question");
    else {
      res.json(result);
      console.log(result);
    }
  });
});

app.get("/getAnswers/:id", (req, res) => {
  let collection = db.collection("answers");
  let id = req.params.id;
  collection.find({ question_id: id }).toArray((err, result) => {
    if (err) console.log("Error in getting answers");
    else {
      res.json(result.reverse());
    }
  });
});

app.get("/answer/:id", (req, res) => {
  let collection = db.collection("answers");
  let id = parseInt(req.params.id);
  collection.findOne({ _id: id}, (err, result) => {
    if (err) console.log("Erro in getting answers");
    else {
      res.json(result);
    }
  });
});

app.post("/postAnswer", async(req, res) => {
  let datetime = moment().format("MMMM Do YYYY, h:mm a");
  let collection = db.collection("answers");
  collection
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray((err, result_find) => {
      if (err) console.log("Error getting max id");
      else {
        //console.log(result_find[0]['_id'] + 1);
        try {
          answer_id = result_find[0]["_id"] + 1;
        } catch (err) {
          answer_id = 0;
        }
      }
    });
  await wait(1000);
  collection.insertOne(
    {
      _id: answer_id,
      answer: req.body.answer,
      author: session.username,
      question_id: req.body.question_id,
      datetime: datetime,
      answerorEdit: "Answered",
    },
    (err, result) => {
      if (err) console.log("Error in posting the answer");
      else {
        res.json("Answer added successfully");
      }
    }
  );
  await wait(1000);
  db.collection('questions').updateOne({_id:parseInt(req.body.question_id)},{$push : {answer_ids : answer_id }});
});

app.put("/editQuestion/:id", (req, res) => {
  let datetime = moment().format("MMMM Do YYYY, h:mm a");
  let collection = db.collection("questions");
  let question_id = parseInt(req.params.id);
  let title = req.body.title;
  let question_body = req.body.question_body;
  let tags = req.body.tags;
  //console.log(question_id);
  //console.log(question_body);
  collection.updateOne(
    { _id: question_id },
    { $set: { title: title , body: question_body, datetime: datetime, tags: tags ,askorEdit: "Edited" } },
    (err, result) => {
      if (err) console.log(err);
      else {
        res.json("Question updated successfully");
      }
    }
  );
});

app.put("/editAnswer/:id", (req, res) => {
  let datetime = moment().format("MMMM Do YYYY, h:mm a");
  let collection = db.collection("answers");
  let answer_id = parseInt(req.params.id);
  let answer = req.body.answer;
  //console.log(question_id);
  //console.log(question_body);
  collection.updateOne(
    { _id: answer_id },
    { $set: { answer: answer, datetime: datetime, answerorEdit: "Edited" } },
    (err, result) => {
      if (err) console.log(err);
      else {
        res.json("Answer updated successfully");
      }
    }
  );
});

app.delete("/deleteQuestion/:id", async (req, res) => {
  let question_id = req.params.id;
  //console.log(question_id);
  db.collection("answers").deleteMany(
    { question_id: question_id },
    (err, result) => {
      if (err)
        console.log("Error deleting answers with qustion deleted by user");
      else {
        console.log("Answers with question deleted was deleted successfully");
      }
    }
  );
  await wait(1000);
  let collection = db.collection("questions");
  collection.deleteOne({ _id: parseInt(question_id) }, (err, result) => {
    if (err) console.log(err);
    else {
      res.json("Question deleted Successfully");
    }
  });
});

app.delete("/deleteAnswer/:answer_id/:question_id", (req, res) => {
  let collection = db.collection("answers");
  let answer_id = parseInt(req.params.answer_id);
  let question_id = parseInt(req.params.question_id);
  //console.log(typeof answer_id);
  collection.deleteOne(
    { _id: answer_id },
    (err, result) => {
      if (err) console.log("Error deleting an answer");
      else {
        res.json("Answer deleted successfully");
      }
    }
  );
  db.collection("questions").updateOne(
    {_id: question_id},
    {$pull : {answer_ids : answer_id}} ,
    (err , result) => {
      if(err) console.log("Error in deleting answer_id from answer_ids array in questions collection");
      else console.log('Deleted answer_id from answer_ids array in questions collection');
    }
  )
});

app.put('/reportQuestion/:id',(req,res)=>{
  let collection = db.collection('questions');
  let question_id = parseInt(req.params.id);
  //let reports = parseInt(req.body.reports);
  collection.updateOne({_id : question_id} , {$push : {reports : req.body.user}} , (err , result)=>{
    if(err) console.log("Error in reporting the question");
    else res.json('You have reported this question');
  });
});

app.put('/reportAnswer/:id',(req,res)=>{
  let collection = db.collection('answers');
  let answer_id = parseInt(req.params.id);
  //let user = parseInt(req.body.user);
  collection.updateOne({_id : answer_id} , {$push : {reports : req.body.user}} , (err , result)=>{
    if(err) console.log("Error in reporting the answer");
    else res.json('You have reported this answer');
  });
});

app.get('/searchQuestion/:searchString',(req,res)=>{
  let collection = db.collection('questions');
  let searchString = req.params.searchString;
  collection.aggregate([
                        {$search:{
                          "text":{
                            "query":searchString,
                            "path":["title","tags"]
                          }
                        }},
                        {
                          $project:{
                            "body":0,
                            "reports":0
                          }
                        }
                      ]).toArray((err , result)=>{
                        if(err) console.log("Error in searching question/tag");
                        else res.json(result);
                      });
});

// app.put('/voteQuestion/:id',(req,res)=>{
//   let change = 0;
//   let collection = db.collection('questions');
//   let question_id = parseInt(req.params.id);
//   let vote = req.body.vote;
//   let voted = req.body.voted;
//   //console.log(voted);
//   if(voted == 'true' && previousVote == undefined &&  vote == 'up'){
//     change = 1;
//   }
//   else if(voted == 'true' && previousVote == undefined && vote == 'down'){
//     change = -1;
//   }
//   else if(voted == 'false' && previousVote == 'up' && vote == 'up'){
//     change = -1;
//   }
//   else if(voted == 'false' && previousVote == 'up' && vote == 'down'){
//     change = -2;
//   }
//   else if(voted == 'false' && previousVote =='down' && vote == 'down'){
//     change = 1;
//   }
//   else{
//     change = 2;
//   }
//   //console.log(question_id);
//   collection.updateOne({'_id':question_id},{$inc:{'votes':change}},(err,result)=>{
//     if(err) console.log("Error updating vote");
//     else{
//       if(voted == 'true')  previousVote = vote;
//       else previousVote = undefined;
//       res.json('Voted the question successfully');
//     }
//   });
// });

app.listen(3000, () => console.log("server is running"));
