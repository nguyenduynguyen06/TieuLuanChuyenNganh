import AdminHomePage from "../pages/Admin/AdminPage";
import HomePage from "../pages/HomePage/homepages";
import Profilepage from "../pages/Profile/profilepage";
import NotFoundPage from "../pages/notfoundpage";
import OrderPage from "../pages/oders";
import ProductPage from "../pages/product";
import ProductDetail from "../pages/ProductDetail/productdetail";
import TypeProductPage from "../pages/ProductTypePage/producttypepage";
import CartPage from "../pages/CartPage/CartPage";
export const routes = [
    {
        path:'/',
        page: HomePage,
        isShowHeader : true
    },
    {
        path:'/order',
        page: OrderPage,
        isShowHeader : true
    },
    {
        path:'/product',
        page: ProductPage,
        isShowHeader : true
    },
    {
        path:'*',
        page: NotFoundPage
    },
    {
        path:'/admin',
        page: AdminHomePage
    },
    {
        path:'/profile',
        page: Profilepage,
        isShowHeader : true
    },
    {
        path:'/pdd',
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path:'/type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path:'/cart',
        page: CartPage,
        isShowHeader: true
    }
]