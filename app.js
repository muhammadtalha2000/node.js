const { request, response, urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const constructor = require('./schema');
const cors = require('cors')
const { postmodel, user_model } = constructor


const app = express();

const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


const Db_uri = "mongodb+srv://talha:godil@cluster0.2tebj.mongodb.net/dev";

mongoose.connect(Db_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


app.post('/create', (request, response) => {
    try {
        const body = request.body;
        postmodel.create(body, (error, data) => {
            if (error) {
                throw error
            } else {
                console.log(data)
                response.send("The post has been created successfully")
            }
        })
    } catch (error) {
        response.send("Got an error", error.message)
    }
})


app.get('/posts', (request, response) => {
    try {
        const { title } = request.headers;
        const query = {};
        if (title) {
            query.title = title
        }
        postmodel.find(query, (error, data) => {
            if (error) {
                throw error
            } else {
                response.send(JSON.stringify(data))
                console.log(data)
            }
        })
    } catch (error) {
        response.send(`Got an error during get posts `, error.message);
    }
});

app.get("/getapost", (request, response) => {
    try {
        const { title } = request.headers;
        const query = {
            title: title
        };
        if (query.title) {
            postmodel.findOne(query, (error, data) => {
                if (error) {
                    throw error;
                } else {
                    response.send(JSON.stringify(data));
                    console.log(data)
                }
            });
        } else {
            response.send('The required field is missing');
        }
    } catch (error) {
        response.send("Got an error during get a post", error.message);
    }
});

app.post('/users', (request, response) => {
    try {
        const body = request.body;
        constructor.user_model.create(body, (error, data) => {
            if (error) {
                throw error
            } else {
                console.log(data)
                response.send("The user has been logged in successfully")
            }
        })
    } catch (error) {
        response.send(`Got an erro`, error.message)
    }
})



app.get('/getusers', (request, response) => {
    try {
        const user_email = request.headers;
        user_model.find({}, (error, data) => {
            if (error) {
                throw error
            } else {
                console.log("users", data)
                response.send("The users has signed in")
            }
        })
    } catch (error) {
        response.send(`Got an error`, error.message)
    }
})












mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error ${error.message}`));

app.listen(port, () => console.log(`The server is running on localhost: ${port}`))
