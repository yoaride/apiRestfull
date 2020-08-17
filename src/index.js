const express = require('express');
const app = express();

//Configuracion
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/persons'));

//Servidor

app.listen(app.get('port'), ( ) => {
    console.log('Server is ruuning on Port: ', app.get('port'));
});

module.exports = app;