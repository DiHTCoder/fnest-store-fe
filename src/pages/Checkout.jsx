import { FormInput, SubmitButton, Breadcrumb } from '../components';
import { Form, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import addressServices from '../services/addressServices';
import { useEffect, useState } from 'react';

import { formatPrice, generateAmountOptions } from '../utils/helpers';
const cartItems = [
    {
        cartID: 1,
        title: 'Sản phẩm mẫu 1',
        price: 29.99,
        image: 'https://gowell.vn/wp-content/uploads/2019/03/ghe-chan-quy-luzi-1.jpg',
        amount: 2,
        company: 'Công ty ABC',
        productColor: 'grey',
    },
    {
        cartID: 2,
        title: 'Sản phẩm mẫu 2',
        price: 29.99,
        image: 'https://gowell.vn/wp-content/uploads/2019/05/ghe-sofa-Comi-1a.png',
        amount: 2,
        company: 'Công ty ABC',
        productColor: 'green',
    },
];

const Checkout = () => {
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            discription: '',
            adress: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
            email: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
            password: Yup.string().required('Vui lòng nhập thông tin!').min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự'),
            fullName: Yup.string().required('Vui lòng nhập thông tin!').max(30, 'Tối đa 30 ký tự'),
        }),
        onSubmit: {},
    });
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const respProvince = await addressServices.getAllProvinces();
                setProvince(respProvince.data);
            } catch (error) {
                console.error(error);
            }
        };
        getProvinces();
    }, []);

    const handleProvinceChange = async (selectedProvince) => {
        setSelectedProvince(selectedProvince);
        setSelectedDistrict(''); // Reset the selected district when changing province
        try {
            const respDistrict = await addressServices.getAllDistrict(selectedProvince);
            setDistrict(respDistrict.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDistrictChange = async (selectedDistrict) => {
        setSelectedDistrict(selectedDistrict);
        try {
            const respWard = await addressServices.getAllWard(selectedDistrict);
            setWard(respWard.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Breadcrumb url="checkout" page="Thanh toán" />
            <Form>
                <div className="grid grid-cols-2 space-x-2">
                    <div>
                        <div className="mx-5">
                            <h2 className="text-bold text-xl m-2">Thông tin khách hàng</h2>
                            <FormInput
                                type="text"
                                label="Tên người nhận"
                                name="username"
                                value="Dĩ"
                                placeholder="Email/Số điện thoại/Tên đăng nhập"
                            />
                            <FormInput
                                type="text"
                                label="Số điện thoại"
                                name="username"
                                value="Dĩ"
                                placeholder="Email/Số điện thoại/Tên đăng nhập"
                            />
                            <FormInput
                                type="text"
                                label="Lời nhắn"
                                name="username"
                                value="Dĩ"
                                placeholder="Email/Số điện thoại/Tên đăng nhập"
                            />
                            <h2 className="m-2">Địa chỉ giao hàng</h2>
                            <div className="flex space-x-2">
                                <select
                                    className="select w-full max-w-xs"
                                    name="province"
                                    value={selectedProvince}
                                    onChange={(e) => handleProvinceChange(e.target.value)}
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {province.map((provinceName) => (
                                        <option key={provinceName} value={provinceName}>
                                            {provinceName}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="select w-full max-w-xs"
                                    name="district"
                                    value={selectedDistrict}
                                    onChange={(e) => handleDistrictChange(e.target.value)}
                                >
                                    <option value="">Chọn quận/huyện</option>
                                    {district.map((districtName) => (
                                        <option key={districtName} value={districtName}>
                                            {districtName}
                                        </option>
                                    ))}
                                </select>
                                <select className="select w-full max-w-xs" name="ward">
                                    <option value="">Chọn phường/xã</option>
                                    {ward.map((wardName) => (
                                        <option key={wardName} value={wardName}>
                                            {wardName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <h2 className="m-2">Phương thức vận chuyển</h2>
                        </div>
                    </div>

                    <div>
                        <div className="mx-5">
                            <h2 className="text-xl m-2 text-bold">Thông tin đơn hàng</h2>
                            <div className="card bg-base-100 shadow-xl"></div>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Checkout;
