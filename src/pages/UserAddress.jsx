import React, { useState, useEffect } from 'react';
import { NavProfile, SubmitButton, FormInput, Loading } from '../components';
import addressServices from '../services/addressServices';
import { useSelector, useDispatch } from 'react-redux';
import { BiTargetLock, BiPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getProvinces } from '../features/address/addressSlice';
import { AiOutlineWarning } from 'react-icons/ai';
import { BiPurchaseTag } from 'react-icons/bi';

const UserAddress = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const token = useSelector((state) => state.auth.login?.token);

    const [addressIdToUpdate, setAddressIdToUpdate] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    //Form info after user selects
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [addressDetail, setAddressDetail] = useState('');

    useEffect(() => {
        if (!token) {
            navigateTo('/login');
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const respUserAdd = await addressServices.getDeliveryAddress(token);
            const respProvinces = await addressServices.getAllProvinces();
            setAddress(respUserAdd.data);
            dispatch(getProvinces(respProvinces.data));
            setProvince(respProvinces.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const closeDialog = () => {
        document.getElementById('dialog_add').close();
        resetForm();
    };

    const resetForm = () => {
        setAddressIdToUpdate(null);
        setIsUpdateMode(false);
        setSelectedProvince('');
        setSelectedDistrict('');
        setSelectedWard('');
        setReceiverName('');
        setReceiverPhone('');
        setAddressDetail('');
    };

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

    const handleSubmit = async () => {
        setIsLoading(true);
        if (isUpdateMode) {
            if (addressIdToUpdate) {
                try {
                    const resp = await addressServices.updateDeliveryAddress(
                        token,
                        addressIdToUpdate,
                        addressDetail,
                        receiverName,
                        receiverPhone,
                        selectedWard,
                        selectedProvince,
                        selectedDistrict,
                    );
                    toast.success(resp.messages[0]);
                    fetchData();
                    resetForm();
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    toast.error('Có lỗi xảy ra.');
                }
            }
        } else {
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
                fetchData();
                resetForm();
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                closeDialog();
                if (error.response && error.response.data && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    toast.error(errorMessages.join(', '));
                } else {
                    toast.error('Có lỗi xảy ra.');
                }
            }
        }
    };

    const handleUpdateAddress = (addressId) => {
        setAddressIdToUpdate(addressId);
        setIsUpdateMode(true);
        document.getElementById('dialog_add').showModal();
    };

    const handleDeleteAddress = async (addressId) => {
        setIsLoading(true);
        try {
            const resp = await addressServices.deleteDeliveryAddress(token, addressId);
            if (resp.status === 'OK') {
                toast.success(resp.messages[0]);
                fetchData();
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', '));
            } else {
                toast.error('Có lỗi xảy ra.');
            }
        }
    };

    const handleSetDefaultAddress = async (addressId) => {
        setIsLoading(true);
        try {
            const respSet = await addressServices.setDefaultAddress(token, addressId);
            toast.success(respSet.messages[0]);
            fetchData();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', '));
                setAddress((prevAddress) => {
                    return {
                        ...prevAddress,
                        defaultAddressId: addressId, // Set the new default address ID
                    };
                });
            } else {
                toast.error('Có lỗi xảy ra.');
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <dialog id="dialog_add" className="modal">
                        <div className="modal-box lg:max-w-2xl max-w-sm">
                            <h3 className="font-bold text-2xl text-center">Địa chỉ mới</h3>
                            <form className="my-2" onSubmit={handleSubmit}>
                                <div
                                    onClick={() => closeDialog()}
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
                                <div className="flex space-x-2 my-2">
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
                                    placeholder="Địa chỉ cụ thể (khu dân cư, xóm, làng, ấp...)"
                                    value={addressDetail}
                                    onchange={(e) => setAddressDetail(e.target.value)}
                                />
                                <div className="py-3">
                                    <SubmitButton text={isUpdateMode ? 'Cập nhật' : 'Thêm địa chỉ'} color="primary" />
                                </div>
                            </form>
                        </div>
                    </dialog>
                    <div className="grid md:grid-cols-4 gap-2 md:mt-10 lg:mb-30 mb-10">
                        <NavProfile />
                        <div className="card md:col-span-3 bg-white shadow-lg">
                            <div className="m-4">
                                <div className="border-b-2 pb-5 lg:text-lg text-sm">
                                    <div className="grid md:grid-cols-2">
                                        <div>
                                            <div className="font-bold">Địa chỉ của tôi</div>
                                            <div className="">Thông tin về địa chỉ nhận hàng và trả hàng</div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                className="btn bg-primary btn-ghost text-white btn-sm lg:btn-md"
                                                onClick={() => {
                                                    setIsUpdateMode(false);
                                                    document.getElementById('dialog_add').showModal();
                                                }}
                                            >
                                                <BiPlus /> Thêm địa chỉ
                                            </button>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className="lg:m-10 m-4">
                                    {address.defaultAddressId === null ? (
                                        <div className="text-xl font-bold text-warning flex items-center">
                                            <AiOutlineWarning />
                                            <p> Vui lòng thêm địa chỉ nhận hàng!</p>
                                        </div>
                                    ) : (
                                        address.deliveryAddresses &&
                                        address.deliveryAddresses.map((item) => (
                                            <div key={item.id}>
                                                <div className="grid md:grid-cols-2">
                                                    <div>
                                                        <span className="font-bold">{item.receiverName}</span> |{' '}
                                                        <span className="">{item.receiverPhone}</span>
                                                        <div className="my-2">
                                                            <p className="text-sm">{item.deliveryAddress}</p>
                                                        </div>
                                                        <div className="flex text-center items-center ">
                                                            {item.id === address.defaultAddressId ? (
                                                                <div className="text-primary flex items-center gap-2">
                                                                    <BiTargetLock />
                                                                    <span> Địa chỉ mặc định</span>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="flex text-blue-400 items-center gap-2 ">
                                                                        <BiPurchaseTag />
                                                                        <button
                                                                            onClick={() =>
                                                                                handleSetDefaultAddress(item.id)
                                                                            }
                                                                        >
                                                                            Đặt làm mặc định
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="justify-end flex">
                                                        <button
                                                            className="flex items-center gap-2 text-primary mx-2"
                                                            onClick={() => handleUpdateAddress(item.id)}
                                                        >
                                                            Cập nhật
                                                        </button>
                                                        <button
                                                            className="flex items-center gap-2 text-primary"
                                                            onClick={() => handleDeleteAddress(item.id)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="divider"></div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UserAddress;
