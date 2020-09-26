const router = require('express').Router()
const emailService = require('../services/emailService')

router.post('/send', async (req,res) => {
    await sendEmail(req, res);
});

async function sendEmail(req, res){
    try{
        const result = await emailService(req.body, req.payload.clientId);
        if(result.success){
            res.send(result);
        }
        else{
            res.status(400).send(result);
        }
    }
    catch(ex){
        res.status(500).send({success: false, message: ex})
    }
    
}

module.exports = router