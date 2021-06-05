const express = require('express');
const morgen = require('morgan')
const {sequelize} = require('./models');

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

const app = express();


app.use(express.json());
app.use(morgen('dev'));

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

app.listen(3000, async () => {
    console.log('server running on 3000');

    await sequelize.authenticate();
    console.log('connected to database')
})