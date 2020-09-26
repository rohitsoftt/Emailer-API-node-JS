Once checkout the repository follow below steps:- 

1. Rename default.example.json to default.json
2. if you want to launch on server then install pm2 globaly ->  npm install pm2 -g -> https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
https://medium.com/@engr.mmohsin/how-to-host-nodejs-on-windows-server-e9bd38b6b6d5
3. and in dev envionment -> node <file name>.js or use nodemon -> npm i nodemon

Request body format to generate key:- 
POST Request 
body:

{
    "clientId" : "clientId",
    "expiryinDays": 50
}
header:
"secretkey": "admin key which is mentioned in defualt.json"
for lifetime validity leave expiryDate null


Email request 
POST request
body:

{
    "fromName": "example",
    "fromEmail": "email",
    "toEmails": "emails",
    "cCEmails": "emails",
    "bccEmails": "emails",
    "replyToEmails": "emails",
    "subject": "Subject",
    "htmlBody": "<b>text</b>",
    "textBody": "welcome text"
}

header: 
"secretkey":"Token Received by generate key api above"