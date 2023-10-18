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

    //handle submitting
    const handleSubmit = async (values) => {
        console.log(values);
        setIsLoading(true);
        try {
            const resp = await userServices.getNewPassword(values.username, values.otp);
            setIsLoading(false);
            console.log(resp);
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
        <div className="flex justify-center items-center h-screen">
            <Form method="post" className="card w-[500px] p-8 bg-base-100 shadow-xl" onSubmit={formik.handleSubmit}>
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold">Lấy lại mật khẩu</h2>
                </div>
                <FormInput
                    type="text"
                    label="OTP(*)"
                    name="username"
                    value={formik.values.username}
                    placeholder="OTP"
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
                <div className="w-[120px] mt-8 ml-2">
                    <SubmitButton text={isLoading ? 'Đang tải...' : 'Lấy mã'} color="primary" disabled={isLoading} />
                </div>
            </Form>
        </div>
    );
};

export default ResetPassword;
