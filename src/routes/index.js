import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSucess from "../pages/OrderSuccessPage/OrderSuccessPage";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import UploadImageComponent from "../components/UploadImageComponent/UploadImageComponent";
import FirebaseImageUpload from "../components/FirebaseImage/FirebaseImageUpload";
import MyComponent from "../components/FirebaseImage/addressTest";
import MyComponent2 from "../components/FirebaseImage/test";
import SearchImage from "../pages/SearchImagePage/SearchImagePage"
import OrderSuccessVnpay from "../pages/OrderSuccessVnpay/OrderSuccessVnpay";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import LoginSuccess from "../pages/LoginSuccessPage/LoginSuccessPage";
import ChangePassword from "../pages/ChangePasswordPage/ChangePasswordPage"
import SearchPage from "../pages/SearchProductPage/SearchProductPage"
import TypePage from "../pages/TypePage/TypePage"
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import ArticlesPage from "../pages/ArticlesPage/ArticlesPage";
import ArticleDetailsPage from "../pages/ArticleDetailsPage/ArticlesDetailPage";
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true

    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isAuth: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
        isAuth: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true,
        isAuth: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true,
        isAuth: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true,
        isAuth: true
    },
    {
        path: '/orderSuccessVnpay',
        page: OrderSuccessVnpay,
        isShowHeader: true,
        isAuth: true
    },
    {
        path: '/products',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/product/filter',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/forgot-password',
        page: ForgotPasswordPage,
        isShowHeader: false
    },
    {
        path: '/reset-password/:token',
        page: ResetPasswordPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
        isAuth: true
    },
    {
        path: '/about-us',
        page: AboutUsPage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
        isAuth: true
    },
    {
        path: '/image',
        page: UploadImageComponent,
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
    {
        path: '/login-success',
        page: LoginSuccess,
        isShowHeader: false
    },
    {
        path: '/test',
        page: MyComponent,
        isShowHeader: false
    },
    {
        path: '/test2',
        page: MyComponent2,
        isShowHeader: false
    },
    {
        path: '/search-image',
        page: SearchImage,
        isShowHeader: true
    },
    {
        path: '/search',
        page: SearchPage,
        isShowHeader: true
    },
    {
        path: '/type/:id',
        page: TypePage,
        isShowHeader: true
    },
    {
        path: '/category/:id',
        page: CategoryPage,
        isShowHeader: true
    },
    {
        path: '/articles',
        page: ArticlesPage,
        isShowHeader: true
    },
    {
        path: '/articles/:id',
        page: ArticleDetailsPage,
        isShowHeader: true
    },
    {
        path: '/change-password',
        page: ChangePassword,
        isShowHeader: true,
        isAuth: true
    }

] 