const nodemailer  = require('nodemailer');

/**
* Roll: Projektet kräver de features så att admin kan skicka e-postmeddelandet till kunderna efter att de kontaktat.
 */
const MailService = {
    /**
     * Sätter upp config för mailserver, och skickar email till kunden
     */
    send(params, callback){
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'mattiasrongefreelancer@gmail.com',
            pass: '1qazxsw2#EDC'
          }
        });
        
        var mailOptions = {
          from: 'mattiasrongefreelancer@gmail.com',
          to: params.to,
          subject: params.subject,
          html: params.html,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(false);
            callback(true);
          } else {
            console.log('Email sent: ' + info.response);
            callback(true);
          }
        });                
    },
    send1(params, callback){ //skickar email till specifik användare 
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'mattiasrongefreelancer@gmail.com',
            pass: '1qazxsw2#EDC'
          }
        });
        
        var mailOptions = {
          from: 'mattiasrongefreelancer@gmail.com',
          to:'mattiasrongefreelancer@gmail.com',
          subject: 'Hi, Someone has contacted you in the site.',
          html: 'username:' + params.name + '<br>' + 'Email:' + params.email + '<br>' + 'Phone: ' + params.phone + '<br>' + 'Message:' + params.message 
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(false);
            callback(true);
          } else {
            console.log('Email sent: ' + info.response);
            callback(true);
          }
        });                
    }
};


module.exports = MailService;