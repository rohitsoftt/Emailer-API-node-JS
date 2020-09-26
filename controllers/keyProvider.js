const config = require('config');
const keys = config.get('keys');
const jwt = require('jwt-simple');
const auth = require('../middlewares/auth');
const staticResponse = require('../response/staticResponse')

var keyProvider = (req, res) => {
    let hKey = req.header('secretkey');
    if(hKey !== undefined && hKey.trim() != ""){
        let clientId = req.body.clientId
        if(clientId !==undefined && clientId != null && clientId.trim() != ""){
            if(hKey == keys["AdminKey"]){
                let secrete = keys["Secrete"];
                var clientData = config.get("clients")[clientId];
                if(clientData !== undefined){
                    
                    let date = new Date();
                    const newDate = new Date(Number(date))
                    if(req.body.expiryinDays !== undefined && req.body.expiryinDays !=null){
                        newDate.setDate(date.getDate() + req.body.expiryinDays);
                        var payload = {
                            clientId: clientId,
                            expiryDate: newDate
                        };
                    }
                    else{
                        if(clientData.expiryinDays !== undefined && clientData.expiryinDays!=null){
                            newDate.setDate(date.getDate() + clientData.expiryinDays);
                            var payload = {
                                clientId: clientId,
                                expiryDate: newDate
                            };
                        }
                        else{
                            var payload = {
                                clientId: clientId,
                                expiryDate: null
                            };
                        }
                    }
                        
                        
                    
                    let token = jwt.encode(payload, secrete, 'HS512');
                    res.status(200).send({token: token});
                }
                else{
                    res.status(200).send(staticResponse.clientService);
                }
            }
            else{
                res.status(401).send(staticResponse.unauthorizedUser);
            }
        }
        else{
            res.status(404).send({message : "Please provide client id 'clientId'"});
        }
    }
    else{
        res.status(401).send(staticResponse.unauthorizedUser);
    }
}

module.exports = keyProvider