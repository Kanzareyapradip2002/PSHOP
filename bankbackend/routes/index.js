const express = require('express')

const router = express.Router()

const GetBankAccount = require('../controller/User/GetBankAccount')
const AddBankAccount = require('../controller/User/AddBankAccount')
const GetAddBankAccount = require('../controller/User/GetAddBankAccount')
const DepositMoney = require('../controller/User/DepositMoney')
const WIderoleHisterey = require('../controller/User/WIderoleHisterey')
const AllPaymentHistory = require('../controller/User/AllPaymentHistory')
const DipositHstrey = require('../controller/User/DipositHstrey')
const RecevPaymentHistory = require('../controller/User/RecevPaymentHistory')



router.get("/GetBankAccount",GetBankAccount)
router.post("/AddBankAccount",AddBankAccount)
router.get("/GetAddBankAccount",GetAddBankAccount)
router.post("/Disposit",DepositMoney)
router.post("/WedroalaHstrey",WIderoleHisterey)
router.post("/DipositHstrey",DipositHstrey)
router.get("/AllPaymentHistory",AllPaymentHistory)
router.get("/RecevPaymentHistory",RecevPaymentHistory)

/// Disposit

module.exports = router 