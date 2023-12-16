import { FormInput, SubmitButton, Loading } from '../components';
import login from '../assets/images/login.jpg';
import { Form, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userServices from '../services/userServices';
import { toast } from 'react-toastify';
import { registerSuccess } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const resp = await userServices.register(
                values.username,
                values.password,
                values.fullName,
                values.email,
                'FEMALE',
                values.birthday,
            );
            dispatch(registerSuccess(resp));
            if (resp.messages && resp.messages.length > 0) {
                setIsLoading(false);
                toast.success(resp.messages[0]);
                navigate('/login');
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

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            fullName: '',
            password: '',
            passwordConfirmation: '',
            gender: 'MALE',
            birthday: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
            email: Yup.string().required('Vui lòng nhập thông tin!').max(35, 'Tối đa 35 ký tự'),
            password: Yup.string().required('Vui lòng nhập thông tin!').min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự'),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu')
                .required('Vui lòng nhập thông tin'),
            fullName: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <section className="my-6 grid lg:grid-cols-2 grid-cols-1 place-items-center">
                    <div className="w-full h-full">
                        <img src={login} alt="Ảnh login" />
                    </div>
                    <Form
                        method="post"
                        className="card lg:w-[500px] md:w-[500px] w-[300px] p-8 bg-base-100 shadow-xl"
                        onSubmit={formik.handleSubmit}
                    >
                        <h3 className="md:text-2xl lg:text-2xl pb-2 font-semibold text-center text-primary">
                            Đăng ký tài khoản
                        </h3>
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
                            label="Họ và tên(*)"
                            name="fullName"
                            value={formik.values.fullName}
                            placeholder="Họ và tên"
                            onchange={formik.handleChange}
                        />
                        {formik.errors.fullName && <p className="text-error text-sm p-1"> {formik.errors.fullName}</p>}
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
                            type="password"
                            label="Xác nhận mật khẩu(*)"
                            name="passwordConfirmation"
                            value={formik.values.passwordConfirmation}
                            placeholder="Xác nhận mật khẩu"
                            onchange={formik.handleChange}
                        />
                        {formik.errors.passwordConfirmation && (
                            <p className="text-error text-sm p-1"> {formik.errors.passwordConfirmation}</p>
                        )}
                        <FormInput
                            type="date"
                            label="Ngày sinh(*)"
                            name="birthday"
                            value={formik.values.birthday}
                            placeholder="Birthday"
                            onchange={formik.handleChange}
                        />
                        {formik.errors.birthday && <p className="text-error text-sm p-1"> {formik.errors.birthday}</p>}
                        <div className="mt-4">
                            <SubmitButton text="Đăng ký" color="primary" />
                        </div>
                        <p className="text-left text-sm text-primary p-2">
                            <Link to="/forgot-password" className="">
                                Quên mật khẩu?
                            </Link>
                        </p>
                        <p className="text-center p-2 text-sm">
                            Bạn đã có tài khoản?
                            <Link to="/login" className="ml-2 link link-hover link-primary">
                                Đăng nhập!
                            </Link>
                        </p>
                    </Form>
                </section>
            )}
        </>
    );
};

export default Register;
