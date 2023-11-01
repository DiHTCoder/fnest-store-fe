import React, { useState, useEffect } from 'react';
import { NavProfile, SubmitButton, FormInput } from '../components';
import addressServices from '../services/addressServices';
import { useSelector } from 'react-redux';
import { BiTargetLock, BiPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';

const UserAddress = () => {
    const [address, setAddress] = useState([]);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const token = useSelector((state) => state.auth.login?.token);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            const getDeliveryAddressDetail = async () => {
                try {
                    const resp = await addressServices.getDeliveryAddress(token);
                    setAddress(resp.data);
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.messages) {
                        const errorMessages = error.response.data.messages;
                        toast.error(errorMessages.join(', '));
                    } else {
                        toast.error('Có lỗi xảy ra.');
                    }
                }
            };
            getDeliveryAddressDetail();
        }
    }, [token]);

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

    const handleWardChange = (selectedWard) => {
        setSelectedWard(selectedWard);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await addressServices.addDeliveryAddress(
                token,
                addressDetail,
                receiverName,
                receiverPhone,
                selectedWard,
                selectedProvince,
                selectedDistrict,
            );
            toast.success(resp.messages[0]);
            closeDialog();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', '));
            } else {
                toast.error('Có lỗi xảy ra.');
            }
        }
    };

    return (
        <div className="grid grid-cols-4 my-5">
            <NavProfile />
            <div className="card col-span-3 bg-white shadow-lg">
                <div className="m-4">
                    <div className="border-b-2 pb-5">
                        <div className="flex justify-between">
                            <div>
                                <div className="text-lg font-bold">Địa chỉ của tôi</div>
                                <div className="text-bold font-light text-error">
                                    Thông tin về địa chỉ nhận hàng và trả hàng
                                </div>
                            </div>
                            <div>
                                <button
                                    className="btn bg-primary btn-ghost text-white"
                                    onClick={() => document.getElementById('dialog').showModal()}
                                >
                                    <BiPlus /> Thêm địa chỉ
                                </button>
                            </div>
                            <div>
                                <dialog id="dialog" className="modal">
                                    <div className="modal-box max-w-2xl">
                                        <h3 className="font-bold text-2xl text-center">Địa chỉ mới</h3>
                                        <form className="my-2" onSubmit={handleSubmit}>
                                            <div
                                                onClick={() => document.getElementById('dialog').close()}
                                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                            >
                                                X
                                            </div>
                                            <FormInput
                                                type="text"
                                                label="Họ và tên"
                                                name="receiverName"
                                                placeholder="Họ và tên"
                                                value={receiverName}
                                                onchange={(e) => setReceiverName(e.target.value)}
                                            />
                                            <FormInput
                                                type="text"
                                                label="Số điện thoại"
                                                name="receiverPhone"
                                                placeholder="Số điện thoại"
                                                value={receiverPhone}
                                                onchange={(e) => setReceiverPhone(e.target.value)}
                                            />
                                            <h2 className="m-2">Địa chỉ giao hàng</h2>
                                            <div className="flex space-x-2">
                                                <select
                                                    className="select w-full max-w-xs"
                                                    name="provinceCityName"
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
                                                    name="districtName"
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
                                                <select
                                                    className="select w-full max-w-xs"
                                                    name="ward"
                                                    onChange={(e) => handleWardChange(e.target.value)}
                                                >
                                                    <option value="">Chọn phường/xã</option>
                                                    {ward.map((wardName) => (
                                                        <option key={wardName} value={wardName}>
                                                            {wardName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <FormInput
                                                type="text"
                                                name="addressDetail"
                                                label="Địa chỉ cụ thể "
                                                placeholder="Thôn /Ấp /Làng / Bản..."
                                                value={addressDetail}
                                                onchange={(e) => setAddressDetail(e.target.value)}
                                            />
                                            <div className="py-3">
                                                <SubmitButton text="Thêm địa chỉ" color="primary" />
                                            </div>{' '}
                                        </form>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>
                    <div className="m-10">
                        {address ? (
                            address.map((item) => (
                                <div key={item.id} className="my-10">
                                    <div className="flex justify-between">
                                        <div>
                                            <span>{item.receiverName}</span> |{' '}
                                            <span className="text-info">{item.receiverPhone}</span>
                                        </div>
                                        <div>
                                            <span className="text-primary mx-2">Cập nhật</span>
                                            <span className="text-primary">Xóa</span>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-sm text-info">{item.deliveryAddress}</p>
                                    </div>
                                    <div className="flex text-center items-center space-x-2 p-2">
                                        <BiTargetLock />
                                        <span className="text-primary">Mặc định</span>
                                    </div>
                                    <div className="border-[0.5px]"></div>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAddress;
