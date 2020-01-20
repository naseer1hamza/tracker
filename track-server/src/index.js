require('./modals/User');
require('./modals/track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:449098@cluster0-3ptlw.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to Mongo', err);
});


app.get('/', requireAuth, (req, res) => {
    res.send(`your email: ${req.user.email}`);

});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

