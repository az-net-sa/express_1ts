const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const cors = require('cors');
const { logEvent , logger } = require('./middleware/logEvents');
const path = require('path');
const corsOptions = require('./config/corsOptions');

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use( '/subdir' ,express.static(path.join(__dirname, '/public')));

// routes 
app.use('/' , require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/regester', require('./routes/regester'));
app.use('/auth', require('./routes/auth'));

// api 
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(port, () => { console.log(`Server is running on port ${port}`) } );
 