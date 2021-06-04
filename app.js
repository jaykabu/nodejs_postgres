const express = require('express');
const {sequelize} = require('./models');

const userRoute = require('./routes/userRoute');

const app = express();


app.use(express.json());

app.use('/api/user', userRoute);

app.listen(3000, async () => {
    console.log('server running on 3000');

    await sequelize.authenticate();
    console.log('connected to database')
})