import AdminHomePage from "../pages/Admin/AdminPage";
import HomePage from "../pages/HomePage/homepages";
import Profilepage from "../pages/Profile/profilepage";
import NotFoundPage from "../pages/notfoundpage";
import OrderPage from "../pages/oders";
import ProductPage from "../pages/product";
import ProductDetail from "../pages/ProductDetail/productdetail";
import TypeProductPage from "../pages/ProductTypePage/producttypepage";
import CartPage from "../pages/CartPage/CartPage";
import SearchSuggestion from "../Components/Header/SearchSuggest";
export const routes = [
    {
        path:'/',
        page: HomePage,
    },
    {
        path:'/order',
        page: OrderPage,
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
        path:'/type/:nameCategory',
        page: TypeProductPage,
    },
    {
        path:'/type/:nameCategory/:nameBrand',
        page: TypeProductPage,
    },
    {
        path:'/product/:productName/:memory',
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path:'/type',
        page: TypeProductPage,
    },
    {
        path:'/cart',
        page: CartPage,
        isShowHeader: true
    },
  
]