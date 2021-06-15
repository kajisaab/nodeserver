const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
// router.get('/', authorize(), getAll);
// router.get('/current', authorize(), getCurrent);
// router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), updateSchema, update);
// router.delete('/:id', authorize(), _delete);


module.exports = router;

function authenticateSchema(req, res, next){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
    
}

function authenticate(req, res, next){
    
    userService.authenticate(req.body)
    .then(user => res.json(user))
    .catch(next=>console.log(next));
    
 
}


function registerSchema(req, res, next){
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        gender: Joi.string().required(),
        workingHospital: Joi.string().required(),
        experience: Joi.string().required(),
        specialization: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    });
    validateRequest(req, next, schema);
}

function register(req,res,next){
    userService.create(req.body)
    .then(()=> res.json({message: "Registration successful"}))
    .catch(next,res.status(400).json({message: "Registration errors"}));
}


// Should update this accordingly 

// function getAll(req, res, next) {
//     userService.getAll()
//         .then(users => res.json(users))
//         .catch(next);
// }

// function getCurrent(req, res, next) {
//     res.json(req.user);
// }

// function getById(req, res, next) {
//     userService.getById(req.params.id)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         username: Joi.string().empty(''),
//         password: Joi.string().min(6).empty('')
//     });
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     userService.delete(req.params.id)
//         .then(() => res.json({ message: 'User deleted successfully' }))
//         .catch(next);
