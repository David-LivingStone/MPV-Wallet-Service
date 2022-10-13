const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError')

const app = express();

app.use (express.json()); 


var corOptions ={
    origin: 'https://localhost:8080'
}

app.use(express.static(`${__dirname}/public`));

//Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

//Routers
const router =require('./Routes/userRoutes')
app.use('/api/v1', router)


//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))





//testing api 
app.get('/', (req, res) => {
    res.json({message: 'Hello From API'})
});


// ROUTER MIDDLEWARE
app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`))
});

//port
const PORT = process.env.PORT || 8080

// server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});