const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const server = app.listen(port, function(){
    console.log(`Express server has started on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/heath-check', (req, res) => {
    try {
        fs.readFileSync(`${__dirname}/maintenance`);
        return res.status(500).send('NOT OK');
    } catch(e) {
        return res.status(200).send('OK');
    }
});

const router = require('./router/main')(app);
