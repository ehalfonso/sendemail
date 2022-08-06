const {Router} = require('express');
//requerimos los modulos nodemailer y el metodo google del modulo googleapis
const nodemailer=require('nodemailer');
const {google}=require('googleapis');
const router = Router();



/*router.get('/',(req,res)=>{
    console.log("Estoy aqui")
    res.send('Hola mundo');
})*/

router.post('/send-email',(req,res)=>{
    //obtenemos los datos enviados por el formulario
    const {name,email,phone,message}=req.body;
    //creamos el cuerpo del mensaje
    contentHTML=`<h1>User Information</h1>
    <ul>
    <li>Username: ${name}</li>
    <li>User Email: ${email}</li>
    <li>Phone: ${phone}</li>
    </ul>
    <p>${message}</p>
    `
    //creamos las siguiente constante para inicializarlas con lo valores obtenidos en la configuracion del correo
    //si se cambia de proyecto en la plataforma de google hay que cambiar los valores de las siguientes constantes
    const CLIENT_ID="720947779983-1sqmgf89dbjlrfi0f6uejcfhu0vspt4i.apps.googleusercontent.com";
    const CLIENT_SECRET="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";
    const REDIRECT_URI="https://developers.google.com/oauthplayground";
    const REFRESH_TOCKEN="1//04kfp8nko9BZ8CgYIARAAGAQSNwF-L9IrmCjgJnMHPwPeMSArm-AXKQLgEUHWGpJvw-buqj5h7YvPWO5aF0a9UXdDa0Hy0OtCdAw";
    //generamos autentificacion URL
    const oAuth2Client=new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
    // seteamos la credencial para cada vez que expire nuestro token
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOCKEN});
    async function sendMail() {
        try {
            const accessToken= await oAuth2Client.getAccessToken();
            const transport=nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type:"OAuth2",
                    user:"ehalfonso@uts.edu.mx",
                    clientId:CLIENT_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken:REFRESH_TOCKEN,
                    accessToken:accessToken
                }
            });
            //objeto de configuracion mailoption
            const mailOptions={
                from:"Pagina web nodemailer <ehalfonso@uts.edu.mx>",
                to:email,
                subject:"Nodemailer prueba",
                html: contentHTML
            };
            //aqui enviamos el correo con su infomacion
            const result = await transport.sendMail(mailOptions)
        } catch (error) {
            console.log(error);
        }
    };
    sendMail()
    .then(result=>res.status(200).send('enviado'))
    .catch(error=>console.log(error.message));
    //res.send('Hola mundo')

    
})


module.exports=router;