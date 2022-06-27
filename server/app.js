const { request } = require("express");
const express = require("express");
const app = express();

class ChatMessage {
    constructor(nickname, message) {
        this._nickname = nickname;
        this._message = message;
    }
};

let messages = [new ChatMessage('system', 'Chat server is up and running!')];

app.use(express.static('../client/public'));
app.use(express.json());

app.get("/api/chat", (req, res) => {
    res.json(messages);
});

app.post("/api/chat", (req, res) => {
    console.log(req);
    let message = req.body;
    messages.push(new ChatMessage(message._nickname, message._message));
    res.status(204).send();
});

app.listen(3000);
console.log("Server is listening")