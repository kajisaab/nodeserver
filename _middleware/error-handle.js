module.exports = errorHandler;

function errorHandler(err, req, res, next){
    switch(true){
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statuscode = is404 ? 404 : 400;
            return res.status(statuscode).json({message: err});
        case err.name === 'UnauthorizedError':
            // JWT authentication error 
            return res.status(401).json({message: 'Unauthorized'});
        default: 
        return res.status(500).json({message: "Something went down"});

    }
}