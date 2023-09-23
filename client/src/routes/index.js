import adminHomePage from "../Components/admin/adminHomePage";
import HomePage from "../pages/HomePage/homepages";
import NotFoundPage from "../pages/notfoundpage";
import OrderPage from "../pages/oders";
import ProductPage from "../pages/product";

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
        page: adminHomePage
    }
]