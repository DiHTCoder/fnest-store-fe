import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SubmitButton } from '../components';
import { NavProfile } from '../components';
import { Form } from 'react-router-dom';
import userServices from '../services/userServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyAccount = () => {
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.auth.login?.currentUser);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await userServices.getOTP(userLogin.accessToken, userLogin.user?.email);
            navigate('/validate-otp');
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
                                <li className="step ">Xác thực mã OTP</li>
                            </ul>

                            <Form className="flex items-center mt-14" method="post" onSubmit={handleSubmit}>
                                <div className="w-[120px] mt-8 ml-2">
                                    <SubmitButton text="Lấy mã" color="primary" />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
