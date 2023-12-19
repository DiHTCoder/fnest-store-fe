import React from 'react';
import { Form, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userServices from '../services/userServices';
import { FormInput, SubmitButton } from '../components';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    //handle submitting
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const resp = await userServices.getNewPassword(values.username, values.otp);
            setIsLoading(false);
            setNewPassword(resp.data.password);
            toast.success(resp.messages[0]);
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
    //handle form validation
    const formik = useFormik({
        initialValues: {
            username: '',
            otp: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
            otp: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
        }),
        onSubmit: handleSubmit,
    });
    return (
        <div className="flex justify-center items-center lg:h-screen lg:my-0 my-10">
            <Form method="post" className="card w-[500px] p-8 bg-base-100 shadow-xl" onSubmit={formik.handleSubmit}>
                <div className="text-center mb-6">
                    <h2 className="lg:text-3xl text-xl font-semibold">Lấy lại mật khẩu</h2>
                </div>
                <FormInput
                    type="text"
                    label="Tên đăng nhập(*)"
                    name="username"
                    value={formik.values.username}
                    placeholder="Tên đăng nhập"
                    onchange={formik.handleChange}
                />
                {formik.errors.username && <p className="text-error text-sm p-1"> {formik.errors.username}</p>}
                <FormInput
                    type="text"
                    label="OTP(*)"
                    name="otp"
                    value={formik.values.otp}
                    placeholder="OTP"
                    onchange={formik.handleChange}
                />
                {formik.errors.otp && <p className="text-error text-sm p-1"> {formik.errors.otp}</p>}
                {newPassword && (
                    <p className="text-center text-success font-bold">Mật khẩu mới của bạn là:{newPassword}</p>
                )}
                <div className="w-[120px] mt-8 ml-2">
                    <SubmitButton
                        text={isLoading ? 'Đang xử lý...' : 'Xác thực'}
                        color="primary"
                        disabled={isLoading}
                    />
                </div>
            </Form>
        </div>
    );
};

export default ResetPassword;
