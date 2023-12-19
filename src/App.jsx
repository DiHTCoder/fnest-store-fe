import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutSuccess } from './features/user/userSlice';
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
    ForgotPassword,
    ResetPassword,
    Map,
    UserAddress,
    Favourite,
    Rooms,
    Collections,
    CollectionDetail,
    Post,
    PostDetail,
} from './pages/index';
import { loader as landingLoader } from './pages/Landing';
import { ErrorElement } from './components';
import { isTokenExpired } from './utils/helpers';
import { useEffect } from 'react';

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
                path: '/posts',
                element: <Post />,
                errorElement: <ErrorElement />,
            },
            {
                path: '/posts/:id',
                element: <PostDetail />,
                errorElement: <ErrorElement />,
            },
            {
                path: '/collections',
                element: <Collections />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'products/:id',
                element: <SingleProduct />,
                errorElement: <ErrorElement />,
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
                path: '/forgot-password',
                element: <ForgotPassword />,
                errorElement: <Error />,
            },
            {
                path: '/reset-password',
                element: <ResetPassword />,
                errorElement: <Error />,
            },
            {
                path: '/address',
                element: <UserAddress />,
                errorElement: <Error />,
            },
            {
                path: '/cart',
                element: <Cart />,
                errorElement: <ErrorElement />,
            },
            {
                path: '/favourite',
                element: <Favourite />,
                errorElement: <ErrorElement />,
            },
            {
                path: '/rooms/:roomId',
                element: <Rooms />,
                errorElement: <ErrorElement />,
            },
            {
                path: '/collections/:collectionsId',
                element: <CollectionDetail />,
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
            {
                path: '/map',
                element: <Map />,
                errorElement: <Error />,
            },
        ],
    },
]);
const App = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.login?.token);
    useEffect(() => {
        if (token) {
            const expire = isTokenExpired(token);
            if (expire) {
                dispatch(logOutSuccess());
            }
        }
    }, []);
    return <RouterProvider router={router} />;
};
export default App;
