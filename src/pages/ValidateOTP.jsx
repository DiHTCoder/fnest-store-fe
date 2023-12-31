import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormInput, SubmitButton } from '../components';
import { NavProfile } from '../components';
import { Form } from 'react-router-dom';
import userServices from '../services/userServices';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ValidateOTP = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.login?.token);
    const handleSubmit = async (values) => {
        try {
            const resp = await userServices.verifyOTP(token, values.otp);
            navigate('/profile');
            toast.success(resp.messages[0]);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', '));
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
            <div className="grid md:grid-cols-4 grid-cols-1 gap-2 md:mt-10 lg:mb-30 mb-10">
                <NavProfile />
                <div className="card md:col-span-3 bg-white shadow-lg">
                    <div className="mx-4 my-4">
                        <div className="border-b-2 pb-5 lg:text-lg text-sm">
                            <div className="text-lg font-bold">Xác nhận Email</div>
                            <div className="text-bold font-light">
                                Để đảm bảo xác thực tài khoản, thực hiện đầy đủ các bước bên dưới để xác nhận email của
                                bạn
                            </div>
                        </div>
                        <div className="md:mx-10 my-10">
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
        </div>
    );
};

export default ValidateOTP;
