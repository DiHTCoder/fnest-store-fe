import React from 'react';
import { FormInput, SubmitButton } from '../components';
import { Form, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import userServices from '../services/userServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateProfileSuccess, updateCurrentUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { NavProfile } from '../components';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            const resp = await userServices.updateProfile(
                user.accessToken,
                values.fullName,
                values.email,
                'FEMALE',
                values.birthday,
            );
            dispatch(updateProfileSuccess(resp.data));
            dispatch(updateCurrentUser(resp.data));
            toast.success('Thay doi thành công!');
            navigate('/profile');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', '));
            } else {
                toast.error('Có lỗi xảy ra.');
            }
        }
    };
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            gender: 'FEMALE',
            birthday: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Vui lòng nhập thông tin!'),
            email: Yup.string().required('Vui lòng nhập thông tin!'),
            gender: Yup.string().required('Vui lòng nhập thông tin!'),
            birthday: Yup.string().required('Vui lòng nhập thông tin!'),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <div className="grid grid-cols-4 my-5">
            <NavProfile />
            <div className="card col-span-3 bg-white shadow-lg">
                <div className="mx-4 my-4">
                    <div className="border-b-2 pb-5">
                        <div className="text-lg font-bold">Chỉnh sửa hồ sơ</div>
                        <div className="text-bold font-light text-error">Vui lòng điền thông tin cần thay đổi!</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <Form method="PATCH" className="" onSubmit={formik.handleSubmit}>
                            <FormInput
                                type="text"
                                label="Họ và tên(*)"
                                name="fullName"
                                value={formik.values.fullName}
                                placeholder="Họ và tên"
                                onchange={formik.handleChange}
                            />
                            {formik.errors.fullName && (
                                <p className="text-error text-sm p-1"> {formik.errors.fullName}</p>
                            )}
                            <FormInput
                                type="email"
                                label="Email(*)"
                                name="email"
                                value={formik.values.email}
                                placeholder="Email"
                                onchange={formik.handleChange}
                            />
                            {formik.errors.email && <p className="text-error text-sm p-1"> {formik.errors.email}</p>}
                            <FormInput
                                type="date"
                                label="Birthday(*)"
                                name="birthday"
                                value={formik.values.birthday}
                                placeholder="Birthday"
                                onchange={formik.handleChange}
                            />
                            {formik.errors.birthday && (
                                <p className="text-error text-sm p-1"> {formik.errors.birthday}</p>
                            )}
                            <div className="mt-4">
                                <SubmitButton text="Luu" color="primary" />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
