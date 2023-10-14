import { FormInput, SubmitButton } from '../components';
import login from '../assets/images/login.jpg';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Form, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userServices from '../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            const resp = await userServices.login(values.email, values.password);
            dispatch(loginSuccess(resp.data));
            toast.success('Dang nhap thanh cong');
            navigate('/');
        } catch (error) {
            toast.error('Sai ten dang nhap/mat khau');
        }
    };

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
        <section className="my-10 grid grid-cols-2 place-items-center">
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
                    <Link to="/reset" className="">
                        Quên mật khẩu?
                    </Link>
                </p>
                <p className="text-center p-2 opacity-75">HOẶC</p>
                {/* <div className="grid grid-cols-2 gap-2">
                    <button className="btn btn-ghost flex text-center place-items-center justify-center border-[1px] border-solid rounded bg-violet-500 hover:bg-violet-600">
                        <FaFacebook className="text-primary m-3" />
                        Facebook
                    </button>
                    <button className="btn btn-ghost flex text-center place-items-center justify-center border-[1px] border-solid rounded">
                        {' '}
                        <FcGoogle className="text-primary m-3" />
                        Google
                    </button>
                </div> */}
                <p className="text-center p-2">
                    Bạn mới biết đến Fnest?{''}
                    <Link to="/register" className="ml-2 link link-hover link-primary capitalize">
                        Đăng ký
                    </Link>
                </p>
            </Form>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    );
};

export default Login;
