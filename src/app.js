const express = require('express');
const path=require('path');
const app = express();
const router=require('./routes/routes');

//setting
//para que nuestro servidor entienda los datos de un formulario
app.use(express.urlencoded({extended:false}));
//para poder obtener los datos desde una SPA,Framework, REACT o Angular
app.use(express.json());
//middlewears

//routes

//app.use(require('./routes/routes'));
app.use(router);
app.use(express.static(path.join(__dirname,'/public')));


module.exports=app;
