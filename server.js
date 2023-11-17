const express = require('express');
const app = express();
const http = require('http');
const Server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');


//------------------------------------IMPORTAR RUTAS------------------------------------------------------------------------------------------------------------------------

    const usersRoutes = require('./routes/userRoutes');

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());


app.disable('x-powered-by');

app.set('port', port);

//------------------------------------LLAMADO DE LAS  RUTAS----------------------------------------------------------------------------------------------------------------

usersRoutes(app);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------



Server.listen(3000, '192.168.1.5' || 'localhost', function() {

    console.log('Aplication de NodeJs ' + process.pid + ' Iniciada... ')

});

app.get('/', (req,res) => {
    res.send('Ruta raíz del backend');
});

//manejo de errores
app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

//200 exitosa
//404 la url no existe
// error del servidor