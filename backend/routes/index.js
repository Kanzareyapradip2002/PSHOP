const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/User/userSignUp")
const userSignInController = require("../controller/User/userSignin")
const userLogout = require('../controller/User/userLogout')
const allUsers = require('../controller/User/allUsers')
const updateUser = require('../controller/User/updateUser')
const UploadImageProductController = require('../controller/Product/UploadImage')
const getProductController = require('../controller/Product/getPeoduct')
const updateProductController = require('../controller/Product/updateProduct')
const getCategoryPeoduct = require('../controller/Product/getCategoryProduct')
const  sendOtp = require('../controller/User/EmailSandOtp')
const getMainCategoryProduct = require('../controller/Product/getMinaCategoryProduct')
const getCategoryWiseProduct = require('../controller/Product/getCategoryWiseProduct')
const sendKEY = require('../controller/User/EmailSandKEY')
const sendMessage = require('../controller/User/EmailSandMessage')
const AddressController = require('../controller/User/Address')
const allAddress = require('../controller/User/GetAddress')
const getAddToCartController = require('../controller/Product/getAddToCart')
const AddToCartProductController = require('../controller/Product/AddToCart')
const deleteAddress = require('../controller/User/AddressDelete')
const deleteAddToCart = require('../controller/Product/DeleteAddToCart')
const OrderProductController = require('../controller/Product/OrderProduct')
const getOrderProductController = require('../controller/Product/GetOrderProdact')
const OrderProdactUpdate = require('../controller/Product/OrderProdactUpdate')
const UpdateAddToCart = require('../controller/Product/UpdateAddToCart')
const EmailOrderDeteles = require('../controller/User/EmailOrderDeteles')





router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/userLogout",userLogout)

//admin panel 

router.get("/all-user",allUsers)
router.post("/update-user",updateUser)

// UploadImage

router.post("/upload-product",UploadImageProductController)
router.get("/get-product",getProductController)
router.post("/update-product",updateProductController)
router.get("/get-categoryProduct",getCategoryPeoduct)
router.get("/get-MaincategoryProduct",getMainCategoryProduct)
router.post("/category-Product",getCategoryWiseProduct)

//opt 
router.post("/email-sandotp",sendOtp)
router.post("/email-sandKEY",sendKEY)
router.post("/email-OrderSendDetels",EmailOrderDeteles)
router.post("/email-sandMessage",sendMessage)

//Adress
router.post("/Add-Address",AddressController)
router.get("/All-Address",allAddress)
router.delete("/DeleteAddress/:id", deleteAddress);

//Add To Cart
router.get("/getAllAddToCart",getAddToCartController)
router.post("/AddToCart",AddToCartProductController)
router.delete("/DeleteAddToCart/:id",deleteAddToCart);
router.post("/OrderProduct",OrderProductController)
router.get("/getAllOrderProdact",getOrderProductController)
router.post("/UpdateConfirmation",OrderProdactUpdate)
router.post("/UpdateAddToCart",UpdateAddToCart)

//WaletAccount




module.exports = router 