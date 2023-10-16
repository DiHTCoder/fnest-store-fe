import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
    About,
    Cart,
    Checkout,
    Error,
    HomeLayout,
    Landing,
    Login,
    Orders,
    Products,
    Register,
    SingleProduct,
    Profile,
    UpdateProfile,
    VerifyAccount,
    ChangePassword,
    ValidateOTP,
} from './pages/index';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleProductLoader } from './pages/SingleProduct';
import { ErrorElement } from './components';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
                errorElement: <ErrorElement />,
                loader: landingLoader,
            },
            {
                path: '/products',
                element: <Products />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'products/:id',
                element: <SingleProduct />,
                errorElement: <ErrorElement />,
                loader: singleProductLoader,
            },
            {
                path: 'profile',
                element: <Profile />,
                errorElement: <ErrorElement />,
            },
            {
                path: '/update-profile',
                element: <UpdateProfile />,
                errorElement: <Error />,
            },
            {
                path: '/change-password',
                element: <ChangePassword />,
                errorElement: <Error />,
            },
            {
                path: '/verify-email',
                element: <VerifyAccount />,
                errorElement: <Error />,
            },
            {
                path: '/validate-otp',
                element: <ValidateOTP />,
                errorElement: <Error />,
            },
            {
                path: '/cart',
                element: <Cart />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'checkout',
                element: <Checkout />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'orders',
                element: <Orders />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'about',
                element: <About />,
                errorElement: <ErrorElement />,
            },
            {
                path: '/login',
                element: <Login />,
                errorElement: <Error />,
            },
            {
                path: '/register',
                element: <Register />,
                errorElement: <Error />,
            },
        ],
    },
]);
const App = () => {
    return <RouterProvider router={router} />;
};
export default App;
