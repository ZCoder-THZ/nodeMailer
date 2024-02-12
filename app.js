const express=require('express')
const nodemailer = require('nodemailer');
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv/config')
const PORT=process.env.PORT || 4001
const app=express();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
     secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });



app.use(bodyParser.json())
app.use(cors())

app.post('/sendMail',(req,res)=>{

    const mailOptions = {
        from:process.env.EMAIL,
        to: req.body.email,
        subject: 'Node.js Email Tutorial',
        text: 'This is a basic email sent from Node.js using Nodemailer.',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.json({message:error})
          
        } else {
            
            return res.json({data:info.response,message:'Email Sent'})
         
        }
      })
      
})

app.listen(PORT,()=>{
    console.log(`app running on PORT ${PORT}`)
})

