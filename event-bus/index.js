const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());

var url = process.env.MONGO_URI
const eventsServiceUri = process.env.EVENTS_SERVICE_URI

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log('Event Bus: Received event ' + event.type);

    await axios.post(eventsServiceUri + '/events', event).catch((err) => {
        console.log('Auth Service: ', err.message);
    });

    await axios.post(eventsServiceUri + '/events', event).catch((err) => {
        console.log('Classroom Service: ', err.message);
    });

    await axios.post(eventsServiceUri + '/events', event).catch((err) => {
        console.log('Posts Service: ', err.message);
    });

    res.send({ status: 'OK' });
})

app.listen(4009, () => {
    console.log('Events service listening at 4009...');
})
