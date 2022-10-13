const db = require('../models');
const uuid = require('uuid');
const catchAsync = require('../utils/catchAsync')
const AppError = require('./../utils/appError')

const User = db.users

const createUser = async(req, res) => {
    try{
        let info = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        walletAccount:req.body.phone
         
    }

    const user = await User.create(info);
    res.status(200).send({
        status: 'Success',
        response: "User Created Successfully!",
        returnObj: user
    });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
        })
    }
    

};
 
const getAllUser = async (req, res) => {
    let users = await User.findAll({})
    res.status(200).send({
        status: 'Success',
        result: users.length,
        returnObj: users
    });
   
};


const getUser = async(req, res, next) => {
    let id = req.params.id
    let user = await User.findOne({where: {id}})
    if (!user) {
        return next(new AppError('No User found with that ID', 404));
    }
    console.log(user)
    res.status(200).send({
        status: 'Success',
        returnObj: user
    })
};

const updateUser = async(req, res) => {
    try{
    let id = req.params.id
    const user = await User.update(req.body,{where: {id}})
    
    res.status(201).send({
        status: 'Success',
        
    });
    
    } catch(err) {
        res.status(404).json({
            status: 'fail',
        })
     }
}

const fundWallet = async(req, res, next) => {
     const  id = req.params.id
     const userAcc = await User.findOne({where: {id}})
     if (!userAcc) {
         return next(new AppError('No User found with that ID', 404));
     }
    // const a = userAcc.wallet * 1;
    // const amount = req.body.wallet * 1;
    const newFund = (userAcc.wallet * 1) + (req.body.wallet * 1);
    
    let info = {
       wallet: newFund
    }

    const acc = await User.update(info,{where: {id}})

    console.log(acc);
     res.status(200).send({
         status: 'Wallet Credited Successfully',       
     });
 
 };

 const transferFund = async(req, res, next) => {
    const  id = req.params.id
     const userAcc = await User.findOne({where: {id}})
     if (!userAcc) {
         return next(new AppError('No User found with that ID', 404));
     }
     if (userAcc.wallet < req.body.wallet){
        return next(new AppError('Insufficient Fund', 400));
     }
     const debit = (userAcc.wallet * 1) - (req.body.wallet * 1)
     let deb = {
        wallet: debit,
     } 
     await User.update(deb,{where: {id}})



     const walletAccount = req.body.walletAccount
     const user = await User.findOne({where:{walletAccount}})
    if (!user) {
    return next(new AppError('No User found with this wallet account', 404));
    }
    const credit = (user.wallet * 1) + (req.body.wallet * 1)
    let info = {
        wallet: credit,
     }
     await User.update(info,{where: {walletAccount}})


     res.status(200).send({
         status: 'Transferred Successfully',       
     });
    
 };

 const withdrawFund = async(req, res, next) => {
    const  id = req.params.id
     const userAcc = await User.findOne({where: {id}})
     if (!userAcc) {
         return next(new AppError('No User found with that ID', 404));
     }
     if (userAcc.wallet < req.body.wallet){
        return next(new AppError('Insufficient Fund', 400));
     }
     const debit = (userAcc.wallet * 1) - (req.body.wallet * 1)
     let deb = {
        wallet: debit,
     } 
     await User.update(deb,{where: {id}})

     res.status(200).send({
        status: 'Transaction Successfull',       
    });

 };

module.exports = {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    fundWallet,
    transferFund,
    withdrawFund
}