import login from '../assets/images/login.jpg';
import { FormInput, SubmitButton } from '../components';
import { Form, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginSuccess, setToken, getProfileSuccess } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import userServices from '../services/userServices';
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    //Login by username and password
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const resp = await userServices.login(values.email, values.password);
            setIsLoading(false);
            if (resp.messages && resp.messages.length > 0) {
                dispatch(loginSuccess(resp.data.user));
                dispatch(setToken(resp.data.accessToken));
                toast.success(resp.messages[0]);
                navigate('/');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', ')); // Display error messages from the response
            } else {
                toast.error('Có lỗi xảy ra.'); // Fallback error message
            }
        }
    };

    //Login by google
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');

    if (token) {
        dispatch(setToken(token));
        useEffect(() => {
            const getUserProfile = async () => {
                try {
                    const resp = await userServices.getProfile(token);
                    dispatch(loginSuccess(resp.data));
                    toast.success(resp.messages[0]);
                    navigate('/');
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.messages) {
                        const errorMessages = error.response.data.messages;
                        toast.error(errorMessages.join(', ')); // Display error messages from the response
                    } else {
                        toast.error('Có lỗi xảy ra.'); // Fallback error message
                    }
                }
            };
            getUserProfile();
        }, []);
    }

    //Form checking
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Vui lòng nhập thông tin!'),
            password: Yup.string().required('Vui lòng nhập thông tin!'),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <section className="my-14 grid grid-cols-2 place-items-center">
            <div className="">
                <img src={login} alt="Ảnh login" />
            </div>
            <Form method="post" className="card w-[500px] p-8 bg-base-100 shadow-xl" onSubmit={formik.handleSubmit}>
                <h3 className="text-2xl pb-2 font-semibold text-center text-primary">
                    Chào mừng bạn đến với <br /> Nội thất Fnest!
                </h3>
                <p className="text-lg font-bold text-center">Đăng nhập bằng tài khoản của bạn</p>
                <FormInput
                    type="text"
                    label="Tên đăng nhập(*)"
                    name="email"
                    value={formik.values.email}
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                    onchange={formik.handleChange}
                />
                {formik.errors.email && <p className="text-error text-sm p-1"> {formik.errors.email}</p>}
                <FormInput
                    type="password"
                    label="Mật khẩu(*)"
                    name="password"
                    value={formik.values.password}
                    placeholder="Mật khẩu"
                    onchange={formik.handleChange}
                />
                {formik.errors.password && <p className="text-error text-sm p-1"> {formik.errors.password}</p>}
                <div className="mt-4">
                    <SubmitButton text="đăng nhập" color="primary" />
                </div>
                <p className="text-left text-sm text-primary p-2">
                    <Link to="/forgot-password" className="">
                        Quên mật khẩu?
                    </Link>
                </p>
                <p className="text-center p-2 opacity-75">HOẶC</p>
                <Link to="http://localhost/oauth2/authorization/google">
                    <div className="btn btn-ghost flex justify-center w-full items-center">
                        <FcGoogle className="w-12 h-12 text-primary" />
                        <span className="ml-2">Đăng nhập bằng Google</span>
                    </div>
                </Link>

                <p className="text-center p-4">
                    Bạn mới biết đến Fnest?{''}
                    <Link to="/register" className="ml-2 link link-hover link-primary">
                        Đăng ký ngay!
                    </Link>
                </p>
            </Form>
        </section>
    );
};

export default Login;
