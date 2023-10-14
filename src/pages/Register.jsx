import { FormInput, SubmitButton } from '../components';
import login from '../assets/images/login.jpg';
import { Form, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userServices from '../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerSuccess } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            const resp = await userServices.register(
                values.username,
                values.password,
                values.fullname,
                values.email,
                'MALE',
                values.birthday,
            );
            dispatch(registerSuccess(resp));
            toast.success('Đăng ký thành công!');
        } catch (error) {
            toast.error('sai');
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            fullname: '',
            email: '',
            password: '',
            gender: 'FEMALE',
            birthday: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Vui lòng nhập thông tin!'),
            email: Yup.string().required('Vui lòng nhập thông tin!'),
            password: Yup.string().required('Vui lòng nhập thông tin!'),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <section className="my-10 grid grid-cols-2 place-items-center">
            <div className="w-full h-full">
                <img src={login} alt="Ảnh login" />
            </div>
            <Form method="post" className="card w-[500px] p-8 bg-base-100 shadow-xl" onSubmit={formik.handleSubmit}>
                <h3 className="text-2xl pb-2 font-semibold text-center text-primary">Đăng ky tai khoan</h3>
                <FormInput
                    type="text"
                    label="Tên đăng nhập(*)"
                    name="username"
                    value={formik.values.username}
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                    onchange={formik.handleChange}
                />
                {formik.errors.username && <p className="text-error text-sm p-1"> {formik.errors.username}</p>}
                <FormInput
                    type="email"
                    label="Email(*)"
                    name="email"
                    value={formik.values.email}
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                    onchange={formik.handleChange}
                />
                {formik.errors.email && <p className="text-error text-sm p-1"> {formik.errors.email}</p>}
                <FormInput
                    type="text"
                    label="Full name"
                    name="fullname"
                    value={formik.values.fullname}
                    placeholder="Full name"
                    onchange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    label="Mật khẩu(*)"
                    name="password"
                    value={formik.values.password}
                    placeholder="Mật khẩu"
                    onchange={formik.handleChange}
                />
                {formik.errors.password && <p className="text-error text-sm p-1"> {formik.errors.password}</p>}

                <FormInput
                    type="date"
                    label="Birthday(*)"
                    name="birthday"
                    value={formik.values.birthday}
                    placeholder="Birthday"
                    onchange={formik.handleChange}
                />
                {formik.errors.birthday && <p className="text-error text-sm p-1"> {formik.errors.birthday}</p>}
                <div className="mt-4">
                    <SubmitButton text="đăng ky" color="primary" />
                </div>
                <p className="text-left text-sm text-primary p-2">
                    <Link to="/reset" className="">
                        Quên mật khẩu?
                    </Link>
                </p>
                <p className="text-center p-2 opacity-75">HOẶC</p>
                <p className="text-center p-2">
                    Da co tai khoan?{''}
                    <Link to="/login" className="ml-2 link link-hover link-primary capitalize">
                        Đăng nhap
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

export default Register;
