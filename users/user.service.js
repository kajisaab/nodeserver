const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    authenticate, 
    getAll,
    getById, 
    create,
    // update,
    delete: _delete
}

async function authenticate({res,req, next, email, password}){
    const user = await db.User.scope('withHash').findOne({where: {email}});


    if(!user || !(await bcrypt.compare(password, user.hash))){
        return res.status(400).json({message: 'Username or Password is incorrect'});
    }
        // return 'Username or Password is incorrect';        

    //authentication successful 
    const token = jwt.sign({sub: user.id}, config.secret, { expiresIn: '7d'});
    return { ...omitHash(user.get()),token};

    

}

async function getAll(){
    return await db.User.findAll();
}

async function getById(id){
    return await getUser(id);
}

async function create(params){
    // validate
    if(await db.User.findOne({where:{email: params.email}})){
        return 'Username "' + params.email + '" is already taken';
    }

    // hash password
    if(params.password){
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

// async function update(id, params){
//     const user = await getUser(id);

//     // validate
//     const emailChan
// }

async function _delete(id) { 
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id){
    const user = await db.User.findByPk(id);
    if(!user) throw 'User not found';
    return user;
}

function omitHash(user){
    const{ hash, ...userWithoutHash } = user;
    return userWithoutHash
}