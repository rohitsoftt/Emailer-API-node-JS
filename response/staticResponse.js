var pageNotFound = {
    success: false,
    message: "Page  not found"
}
var unauthorizedUser = {
    success: false,
    message: "Unathorised user"
}

var modelNotFound = {
    success: false,
    message: "Model not found"
}
var clientService = {
    success: false,
    message : "client service is not active"
}
var tokenExpire = {
    success: false,
    message : "Token has been expired!"
}
var unknownException = {
    success: false,
    message: "unknown exception"
}
var  getErrorObject = (err) => {
    let result = {}
    result["success"] = false;
    result["errors"] = {};
    if(err.message !== undefined){
        result["errors"]["exception"] = err.message;
    }
    if (err.errors !== undefined){
        for(let item in err.errors){
            result["errors"][item] = err.errors[item].message;
        }
    }
    else{
        for(let item in err){
            result["errors"][item] = err[item];
        }
    }
    return result;
}
var getSuccesObject = (succ) => {
    var result = {
        success: true,
        message: "Added successfully!"
    };
    return result;
}
module.exports = {pageNotFound, unauthorizedUser, modelNotFound, clientService, unknownException, tokenExpire, getErrorObject, getSuccesObject}