import React from 'react';
import { FormInput, SubmitButton } from '../components';
import { Form } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userServices from '../services/userServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavProfile } from '../components';
import { logOutSuccess } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.login?.token);

    const handleSubmit = async (values) => {
        try {
            const resp = await userServices.changePassword(token, values.oldpassword, values.newpassword);
            toast.success('Thay đổi thành công! Đăng nhập để tiếp tục');
            dispatch(logOutSuccess());
            navigate('/profile');
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
            oldpassword: '',
            newpassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            newpassword: Yup.string()
                .required('Vui lòng nhập thông tin!')
                .min(8, 'Mật khẩu mới phải có ít nhất 8 kí tự')
                .notOneOf([Yup.ref('oldpassword')], 'Mật khẩu mới không được trùng với mật khẩu cũ'),
            oldpassword: Yup.string().required('Vui lòng nhập thông tin!'),
            confirmPassword: Yup.string()
                .required('Vui lòng nhập thông tin!')
                .oneOf([Yup.ref('newpassword'), null], 'Mật khẩu xác nhận phải trùng với mật khẩu mới'),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <div className="grid md:grid-cols-4 gap-2 md:mt-10 lg:mb-30 mb-10">
            <NavProfile />
            <div className="card md:col-span-3 bg-white shadow-lg">
                <div className="m-4">
                    <div className="border-b-2 pb-5 lg:text-lg text-sm">
                        <div className="font-bold">Đổi mật khẩu</div>
                        <div className="">Vui lòng nhập đầy đủ thông tin!</div>
                    </div>
                    <div className="grid lg:grid-cols-2">
                        <Form method="PATCH" className="my-2 mx-6" onSubmit={formik.handleSubmit}>
                            <FormInput
                                type="password"
                                label="Mật khẩu cũ(*)"
                                name="oldpassword"
                                value={formik.values.oldpassword}
                                placeholder="Mật khẩu cũ"
                                onchange={formik.handleChange}
                            />
                            {formik.errors.oldpassword && (
                                <p className="text-error text-sm p-1"> {formik.errors.oldpassword}</p>
                            )}
                            <FormInput
                                type="password"
                                label="Mật khẩu mới(*)"
                                name="newpassword"
                                value={formik.values.newpassword}
                                placeholder="Mật khẩu mới"
                                onchange={formik.handleChange}
                            />
                            {formik.errors.newpassword && (
                                <p className="text-error text-sm p-1"> {formik.errors.newpassword}</p>
                            )}
                            <FormInput
                                type="password"
                                label="Mật khẩu xác nhận(*)"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                placeholder="Mật khẩu xác nhận"
                                onchange={formik.handleChange}
                            />
                            {formik.errors.confirmPassword && (
                                <p className="text-error text-sm p-1"> {formik.errors.confirmPassword}</p>
                            )}

                            <div className="mt-4">
                                <SubmitButton text="Lưu" color="primary" />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
