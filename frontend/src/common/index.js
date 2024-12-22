
const backendDomain = "http://localhost:8001";
const BankbackendDomain = "http://localhost:8002";

const SummaryApi = {
    SignUp: {
        url: `${backendDomain}/signup`,
        method: "POST",
    },
    SignIn: {
        url: `${backendDomain}/signin`,  
        method: "POST",
    },
    Currentuser: {
        url: `${backendDomain}/user-details`,
        method: "GET",
    },
    LogoutUser: {
        url: `${backendDomain}/userLogout`,
        method: "GET",
    },
    AllUser: {
        url: `${backendDomain}/all-user`,
        method: "GET",
    },
    UpdateUser: {
        url: `${backendDomain}/update-user`,
        method: "POST",
    },
    UploadProduct:{
        url: `${backendDomain}/upload-product`,
        method: "POST",
    },
    Address:{
        url: `${backendDomain}/Add-Address`,
        method: "POST",
    },
    AllProduct: {
        url: `${backendDomain}/get-product`,
        method: "GET",
    },
    AllAddress:{
        url: `${backendDomain}/All-Address`,
        method: "GET",
    },
    UpdateProduct: {
        url: `${backendDomain}/update-product`,
        method: "POST",
    },
    OrderProduct:{
        url: `${backendDomain}/OrderProduct`,
        method: "POST",
    },
    getAllOrderProdact:{
        url:`${backendDomain}/getAllOrderProdact`,
        method:"GET"
    },
    Sendotp:{
        url: `${backendDomain}/email-sandotp`,
    },
    SendKEY:{
        url: `${backendDomain}/email-sandKEY`,
    },
    SendEmailOrderDetels:{
        url: `${backendDomain}/email-OrderSendDetels`,
    },
    
    CategoryProduct:{
        url:`${backendDomain}/get-categoryProduct`,
        method:"GET"
    },
    SendMessage:{
        url:`${backendDomain}/email-sandMessage`,
    },
    MainCategoryProduct:{
        url:`${backendDomain}/get-MaincategoryProduct`,
        method:"GET"
    },
    CategoryWiseProduct:{
        url:`${backendDomain}/category-Product`,
        method:"POST"
    },
    AllAddToCart:{
        url:`${backendDomain}/getAllAddToCart`,
        method:"GET"
    },
    AddToCart:{
        url:`${backendDomain}/AddToCart`,
        method:"POST"
    },
    DeleteAddress: {
        url: `${backendDomain}/DeleteAddress/:id`, 
        method: "DELETE"
    },
    DeleteAddToCart: {
        url: `${backendDomain}/DeleteAddToCart/:id`, 
        method: "DELETE"
    },
    LoginUser:{
        url: `${backendDomain}/LoginUser`, 
        method: "POST"
    },
    GetBankAccount: {
        url: `${BankbackendDomain}/GetBankAccount`, 
        method: "GET"
    },

    AddBankAccount: {
        url: `${BankbackendDomain}/AddBankAccount`, 
        method: "POST"
    },
    
    
    GetAddBankAccount: {
        url: `${BankbackendDomain}/GetAddBankAccount`, 
        method: "GET"
    },

    UpdateBalance:{
        url: `${BankbackendDomain}/Disposit`, 
    },

    Confirmation:{
        url: `${backendDomain}/UpdateConfirmation`,
        method:"POST" 
    },
    AddToCartUpdate:{
        url: `${backendDomain}/UpdateAddToCart`,
        method:"POST" 
    },

    WedroalaHstrey:{
        url: `${BankbackendDomain}/WedroalaHstrey`, 
        method: "POST"
    },

    DipositHstrey:{
        url: `${BankbackendDomain}/DipositHstrey`, 
        method: "POST"
    },
    AllPaymentHistory:{
        url: `${BankbackendDomain}/AllPaymentHistory`, 
        method: "GET"
    },
    RecevPaymentHistory:{
        url: `${BankbackendDomain}/RecevPaymentHistory`, 
        method: "GET"
    },

    
    
    
};

export default SummaryApi;
