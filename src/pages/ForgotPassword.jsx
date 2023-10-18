import React from 'react';
import { Form, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userServices from '../services/userServices';
import { FormInput, SubmitButton } from '../components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    //handle submitting
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const resp = await userServices.getOTP(values.email);
            setIsLoading(false);
            navigate(`/reset-password`);
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
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
        }),
        onSubmit: handleSubmit,
    });
    return (
        <div className="flex justify-center items-center h-screen">
            <Form method="post" className="card w-[500px] p-8 bg-base-100 shadow-xl" onSubmit={formik.handleSubmit}>
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold">Quên mật khẩu</h2>
                </div>
                <FormInput
                    type="email"
                    label="Email(*)"
                    name="email"
                    value={formik.values.email}
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                    onchange={formik.handleChange}
                />
                {formik.errors.email && <p className="text-error text-sm p-1"> {formik.errors.email}</p>}
                <div className="w-[120px] mt-8 ml-2">
                    <SubmitButton text={isLoading ? 'Đang tải...' : 'Lấy mã'} color="primary" disabled={isLoading} />
                </div>
            </Form>
        </div>
    );
};

export default ForgotPassword;
