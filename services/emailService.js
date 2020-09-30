var nodemailer = require('nodemailer');
const config = require('config')

function getEmailData(emailData, clientId){
    var emailConfigData = config.get('clients')[clientId]["emailconfig"]
    var returnData = {}
    returnData.fromName = check(emailData.fromName) ? emailData.fromName : emailConfigData.fromName;
    returnData.fromEmail = check(emailData.fromEmail) ? emailData.fromEmail : emailConfigData.fromEmail;
    returnData.toEmails = check(emailData.toEmails) ? emailData.toEmails : emailConfigData.toEmails;
    returnData.cCEmails = check(emailData.cCEmails) ? emailData.cCEmails : emailConfigData.cCEmails;
    returnData.bccEmails = check(emailData.bccEmails) ? emailData.bccEmails : emailConfigData.bccEmails;
    returnData.replyToEmails = check(emailData.replyToEmails) ? emailData.replyToEmails : emailConfigData.replyToEmails;
    returnData.priority = check(emailData.priority) ? emailData.priority : null;
    returnData.username = emailConfigData.username;
    returnData.password = emailConfigData.password;
    returnData.smtp = emailConfigData.smtp;
    returnData.smtpPort = emailConfigData.smtpPort;
    return returnData;
    function check(value){
        if(value === undefined || value == null || value == "" || value == " "){
            return false;
        }
        else{
            return true;
        }
    }
    //if(emailData.)
}
async function sendEmail(emailData, clientId){
    var emailConfigData = getEmailData(emailData, clientId)
    let transporter = nodemailer.createTransport({
        host: emailConfigData.smtp,
        port: emailConfigData.smtpPort,
        secure: false, // true for 465, false for other ports
        auth: {
          user: emailConfigData.username, // generated ethereal user
          pass: emailConfigData.password, // generated ethereal password
        },
      });
    try{
        // send mail with defined transport object
        var info = await transporter.sendMail({
            from: `"${emailConfigData.fromName}" <${emailConfigData.fromEmail}>`, // sender address
            to: emailConfigData.toEmails, // list of receivers
            replyTo: emailConfigData.replyToEmails,
            cc: emailConfigData.cCEmails,
            bcc: emailConfigData.bccEmails,
            priority: emailConfigData.priority,
            subject: emailData.subject, // Subject line
            text: emailData.textBody, // plain text body
            html: emailData.htmlBody, // html body
        });
        console.log("Message sent: %s", info.messageId);
    }
    catch(ex){
        console.log(ex);
        var exception = ex;
        return {success: false, message: exception}
    }
    return {success: true, message: null}

    // 
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

  module.exports = sendEmail