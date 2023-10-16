import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FormInput, SubmitButton } from '../components';
import { NavProfile } from '../components';
import { Form, Link } from 'react-router-dom';
import userServices from '../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ValidateOTP = () => {
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.auth.login?.currentUser);
    const handleSubmit = async (values) => {
        try {
            const resp = await userServices.verifyOTP(userLogin.accessToken, values.otp);
            setTimeout(() => {
                navigate('/profile');
            }, 2500);
            toast.success(resp.messages[0]);
        } catch (error) {
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
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string().required('Vui lòng nhập thông tin!'),
        }),
        onSubmit: handleSubmit,
    });
    return (
        <div>
            <div className="grid grid-cols-4 my-5">
                <NavProfile />
                <div className="card col-span-3 bg-white shadow-lg">
                    <div className="mx-4 my-4">
                        <div className="border-b-2 pb-5">
                            <div className="text-lg font-bold">Xác nhận Email</div>
                            <div className="text-bold font-light">
                                Để đảm bảo xác thực tài khoản, thực hiện đầy đủ các bước bên dưới để xác nhận email của
                                bạn
                            </div>
                        </div>
                        <div className="mx-10 my-10">
                            <ul className="steps w-full">
                                <li className="step step-success">Lấy mã OTP</li>
                                <li className="step step-success">Xác thực mã OTP</li>
                            </ul>

                            <Form className="flex items-center mt-14" method="post" onSubmit={formik.handleSubmit}>
                                <FormInput
                                    type="text"
                                    label="OTP(*)"
                                    name="otp"
                                    value={formik.values.otp}
                                    placeholder="OTP"
                                    onchange={formik.handleChange}
                                />
                                {formik.errors.otp && <p className="text-error text-sm p-1"> {formik.errors.otp}</p>}
                                <div className="w-[120px] mt-8 ml-2">
                                    <SubmitButton text="Xác nhận" color="primary" />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    );
};

export default ValidateOTP;
