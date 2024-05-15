import AdminHomePage from "../pages/Admin/AdminPage";
import HomePage from "../pages/HomePage/homepages";
import Profilepage from "../pages/Profile/profilepage";
import NotFoundPage from "../pages/notfoundpage";
import ProductDetail from "../pages/ProductDetail/productdetail";
import CartPage from "../pages/CartPage/CartPage";
import PaymentInfo from "../pages/PaymentPage/paymentinfo";
import PaymentSuccess from "../pages/paymentVNPAYsuccess";
import OrderDetail from "../pages/Profile/orderdetail";
import WarrantySearch from "../Components/TableComponents/Warranty";
import OrderSuccess from "../pages/OrderSuccess/ordersuccess";
import LandingPage from "../Components/LandingPage/LandingPage";
import Register from "../Components/Header/register";
import Login from "../Components/Header/login";
import About from "../Components/LandingPage/About";
import ProductPage from "../pages/ProductTypePage/ProductPage";
export const routes = [
    {
        path:'/',
        page: HomePage,
        isShowFooter : true,
    },
    {
        path:'*',
        page: NotFoundPage,
        isShowFooter: false
    },
    {
        path:'/admin/*',
        page: AdminHomePage,
        isShowFooter: false,
    },
    {
        path:'/profile/*',
        page: Profilepage,
        isShowFooter: true
    },

    {
        path:'/product/:productName/:memory',
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path:'/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path:'/payment-infor',
        page: PaymentInfo,
        isShowHeader: true
    },
    {
        path:'/order-success',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path:'/vnpay_return',
        page: PaymentSuccess,
    },
    {
        path:'/order-detail/:orderCode',
        page: OrderDetail
    },
    {
        path:'/warranty',
        page: WarrantySearch,
        isShowHeader: true
    },
    {
        path:'/landingpage',
        page: LandingPage
    },
    {
        path:'/login',
        page: Login,
        isShowHeader: true

    },
    {
        path:'/register',
        page: Register,
        isShowHeader: true
    },
    {
        path: '/about',
        page: About
    },
    {
        path: '/products/:nameCategory/:nameBrand',
        page: ProductPage,
      
    },
    {
        path: '/products/:nameCategory',
        page: ProductPage,
    },
    {
        path: '/products',
        page: ProductPage,
    },
]