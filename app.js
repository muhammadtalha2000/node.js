const { request, response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const postModel = require('./schema');




const Db_uri = "mongodb+srv://hello:world@cluster0.ltwbc.mongodb.net/dev";

mongoose.connect(Db_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


const app = express();

const port = 8000;


app.get("/add", (request, response) => {
    postModel.create({ fname: "Talha", lname: "Godil" }, (error, data) => {
        if (error) {
            response.send(error.message);
        } else {
            console.log(data);
            response.send("Success");
        }
    });
});

app.get("/data", (request, response) => {
    postModel.create({ fname: "Mustafa", lname: "Jabbar" }, (error, data) => {
        if (error) {
            response.send(error.message);
        } else {
            console.log(data);
            response.send("Success");
        }
    });
});

app.get("/put", (request, response) => {
    postModel.create({ fname: "Ahmed", lname: "Raza" }, (error, data) => {
        if (error) {
            response.send(error.message);
        } else {
            console.log(data);
            response.send("Success");
        }
    });
});

app.get("/search", (request, response) => {
    postModel.findOne({ fname: "Talha" }, (error, data) => {
        if (error) {
            response.send(error.message);
        } else {
            console.log(data);
            response.send(JSON.stringify(data))
            response.send("Success");
        }
    })
})

app.get("/delete", (request, response) => {
    postModel.deleteOne({ fname: "Mustafa" }, (error, data) => {
        if (error) {
            response.send(error.message);
        } else {
            console.log(data);
            // response.send(JSON.stringify(data))
            response.send("Success");
        }
    })
})


app.get("/update", (request, response) => {
    postModel.deleteOne({ fname: "Talha", lname: "Godil" }, (error, data) => {
        if (error) {
            response.send(error.message);
        } else {
            console.log(data);
            // response.send(JSON.stringify(data))
            response.send("Success");
        }
    })
})







mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error ${error.message}`));

app.listen(port, () => console.log(`The server is running on localhost: ${port}`))
