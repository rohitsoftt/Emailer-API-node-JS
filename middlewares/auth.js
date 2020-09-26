const config = require('config');
const keys = config.get('keys');
const jwt = require('jwt-simple');
const staticResponse = require('../response/staticResponse');

var authMiddleware = async function(req, res, next){
    try{
        if(!config.get('ignoreRoutes').includes(req.originalUrl)){
            let secrete = keys["Secrete"];
            let hKey = req.header("secretkey")
            try{
                var payload = await checkJWT(hKey, secrete);
                var clientData = config.get("clients")[payload.clientId];
                if(clientData!==undefined){
                    if(clientData.isActive){
                        if(payload.expiryDate !== undefined && payload.expiryDate != null){
                            let date = new Date();
                            let expiryDate = new Date(payload.expiryDate)
                            if(date > expiryDate){
                                res.status(400).send(staticResponse.tokenExpire);
                            }
                            else{
                                req.payload = payload;
                                next();
                            }
                        }
                        else{
                            req.payload = payload;
                            next();
                        }
                        
                    }
                    else{
                        res.status(400).send(staticResponse.clientService);
                    }
                }
                else{
                    res.status(401).send(staticResponse.clientService);
                }
            }
            catch{
                res.status(401).send(staticResponse.unauthorizedUser);
            }
            async function checkJWT(token, secret){
                let decoded = jwt.decode(token, secret, 'HS512');
                console.log(decoded);
                return decoded; //=> { foo: 'bar' }
            }
        }
        else{
            next();
        }
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
}

var getTenantName = function(token){
    var data = jwt.decode(token, keys["Secrete"])
    return data.tenant;
}

module.exports = { authMiddleware, getTenantName}