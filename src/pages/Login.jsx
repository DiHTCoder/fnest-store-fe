import { FormInput, SubmitButton } from '../components';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Form, Link } from 'react-router-dom';
import Logo from '../assets/Logo-fnest.svg';
const Login = () => {
    return (
        <section className="h-screen grid place-items-center">
            <Form method="post" className="card w-96 p-8 bg-base-100 shadow-xl">
                <img src={Logo} alt="" className="h-[150px]" />
                <p className="text-lg font-bold text-center">
                    Đăng nhập bằng tài khoản của bạn
                </p>
                <FormInput
                    type="name"
                    label="Tên đăng nhập"
                    name="usename"
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                />
                <FormInput
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    placeholder="Mật khẩu"
                />
                <div className="mt-4">
                    <SubmitButton text="đăng nhập" color="primary" />
                </div>
                <p className="text-left text-sm text-primary p-2">
                    {' '}
                    <Link to="/reset" className="">
                        {' '}
                        Quên mật khẩu?
                    </Link>
                </p>
                <p className="text-center p-2 opacity-75">HOẶC</p>
                <div className="grid grid-cols-2 gap-2">
                    <button className="btn btn-ghost flex text-center place-items-center justify-center border-[1px] border-solid rounded bg-violet-500 hover:bg-violet-600">
                        <FaFacebook className="text-primary m-3" />
                        Facebook
                    </button>
                    <button className="btn btn-ghost flex text-center place-items-center justify-center border-[1px] border-solid rounded">
                        {' '}
                        <FcGoogle className="text-primary m-3" />
                        Google
                    </button>
                </div>
                <p className="text-center p-2">
                    Bạn mới biết đến Fnest?{''}
                    <Link
                        to="/register"
                        className="ml-2 link link-hover link-primary capitalize"
                    >
                        Đăng ký
                    </Link>
                </p>
            </Form>
        </section>
    );
};

export default Login;
