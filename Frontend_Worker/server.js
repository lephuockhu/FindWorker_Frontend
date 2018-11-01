const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/chat', function (req, res) {
    res.sendFile('chat.html', { root: path.join(__dirname, '/public') });
})

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

app.listen(process.env.PORT || 3200, () => console.log(`Web API listening on port ${3200}!`));