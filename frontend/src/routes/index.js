import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import ForgotPassword from '../Pages/ForgotPassword'
import SignUp from '../Pages/SignUp'
import AdminPanel from '../Pages/AdminPanel'
import Allusers from '../Pages/Allusers'
import AllProducts from '../Pages/AllProducts'
import EmailPage from '../Components/EmailPage'
import MainCategoryList from '../Pages/MainCategoryList'
import Category from '../Pages/Category/Category'
import ShowCategoryProduct from '../Pages/Category/ShowCategoryProduct'
import SeandMessageOner from '../Pages/Banner/SeandMessageOner'
import PlaceOrderPage from '../Pages/Category/PlaceOrderPage'
import AddToCart from '../Pages/Category/AddToCart'
import Wallet from '../Pages/Paymant/Wallet'
import AddBankAccount from '../Pages/Paymant/AddBankAccount'
import PamantPage from '../Pages/Paymant/PamantPage'
import OrderProcessing from '../Pages/Category/OrderProcessing'
import OrderConformed from '../Pages/Category/OrderConformed'
import ConformedPage from '../Pages/Category/ConformedPage'
import ConformedOrderDetels from '../Pages/Category/ConformedOrderDetels'
import RecevaPaymantHistory from '../Pages/Paymant/RecevaPaymantHistory'
import CancelOrderDetels from '../Pages/Category/CancelOrderDetels'
import OrderCancel from '../Pages/Category/OrderCancel'


const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element: <Home/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"forgot-password",
                element: <ForgotPassword/>
            },
            {
                path:"sign-up",
                element: <SignUp/>
            },
            {
                path:"get-Category/:categoryName",
                element: <MainCategoryList/>,
            },
            {
                path:"Category/:categoryName",
                element:<Category/>
            },
            {
               path:"ShowCategoryProduct",
               element:<ShowCategoryProduct/>
            },
            {
                path:"Seand-Massge-Oner",
                element:<SeandMessageOner/>
             },
            {
                path:"admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path:"all-users",
                        element:<Allusers/>
                    },
                    {
                        path:"all-products",
                        element:<AllProducts/>
                    },
                    {
                        path:"Processing-Order",
                        element:<OrderProcessing/>
                    },
                    {
                        path:"Conformed-Order",
                        element:<OrderConformed/>
                    },
                    {
                        path:"Cancel-Order",
                        element:<OrderCancel/>
                    },
                    {
                        path:"RecevaPayment",
                        element:<RecevaPaymantHistory/>
                    },
                    
                    
                ]
            },
            {
                path:"admin-panel/Processing-Order/ConformedPage/:id",
                element:<ConformedPage/>
            },
            {
                path:"admin-panel/Conformed-Order/ConformedPage/:id",
                element:<ConformedOrderDetels/>
            },
            {
                path:"admin-panel/Cancel-Order/ConformedPage/:id",
                element:<CancelOrderDetels/>
            }, 
            
            {
                path:"Email-Otp",
                element:<EmailPage/>
            },
            {
                path:"Place-Order",
                element:<PlaceOrderPage/>
            },
            {
                path:"AddToCart",
                element:<AddToCart/>
            },
            {
                path:"User-Wallet/:Code",
                element:<Wallet/>
            },
            {
                path:"AddBankAccount/:Codes",
                element:<AddBankAccount/>
            },
            {
                path:"PaymentPage/:AccountNumber",
                element:<PamantPage/>
            },
            
              
                       
        ]
        
    }
])

export default router