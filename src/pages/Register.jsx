import { FormInput, SubmitButton } from '../components';
import { Form, Link } from 'react-router-dom';
import Logo from '../assets/Logo-fnest.svg';
const Register = () => {
    return (
        <section className="h-screen grid place-items-center">
            <Form method="post" className="card w-96 p-8 bg-base-100 shadow-xl">
                <img src={Logo} alt="" className="h-[150px]" />
                <p className="text-lg font-bold text-center">
                    Đăng ký tài khoản
                </p>
                <FormInput
                    type="name"
                    label="Tên đăng nhập"
                    name="usename"
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                />
                <FormInput
                    type="email"
                    label="Email"
                    name="password"
                    placeholder="Email"
                />
                <FormInput
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    placeholder="Mật khẩu"
                />
                <div className="mt-4">
                    <SubmitButton text="đăng ký" color="primary" />
                </div>

                <p className="text-center p-2">
                    Bạn đã có tài khoản?{''}
                    <Link
                        to="/login"
                        className="ml-2 link link-hover link-primary capitalize"
                    >
                        Đăng nhập
                    </Link>
                </p>
            </Form>
        </section>
    );
};

export default Register;
