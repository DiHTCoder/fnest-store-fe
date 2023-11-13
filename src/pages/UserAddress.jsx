import React, { useState, useEffect } from 'react';
import { NavProfile, SubmitButton, FormInput } from '../components';
import addressServices from '../services/addressServices';
import { useSelector, useDispatch } from 'react-redux';
import { BiTargetLock, BiPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getProvinces } from '../features/address/addressSlice';
import { AiOutlineWarning } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { BiPurchaseTag } from 'react-icons/bi';

const UserAddress = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    //Get tokens
    const token = useSelector((state) => state.auth.login?.token);

    const [addressIdToUpdate, setAddressIdToUpdate] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    //initial address of a user
    const [address, setAddress] = useState([]);

    //Initial address when user selects
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

    //get all addresses
    useEffect(() => {
        if (!token) {
            navigateTo('/login');
        } else {
            const getAllUserAddresses = async () => {
                try {
                    const resp = await addressServices.getDeliveryAddress(token);
                    setAddress(resp.data);
                } catch (error) {
                    console.error(error);
                }
            };
            const getAllProvinces = async () => {
                try {
                    const resp = await addressServices.getAllProvinces();
                    dispatch(getProvinces(resp.data));
                    setProvince(resp.data);
                } catch (error) {
                    console.error(error);
                }
            };
            getAllUserAddresses();
            getAllProvinces();
        }
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
                    document.getElementById('dialog').close();
                    // Update the address state with the new data
                    setAddress((prevAddress) => {
                        const updatedAddresses = prevAddress.deliveryAddresses.map((item) => {
                            if (item.id === addressIdToUpdate) {
                                // Replace the existing address with the updated one
                                return resp.data;
                            }
                            return item;
                        });
                        return {
                            ...prevAddress,
                            deliveryAddresses: updatedAddresses,
                        };
                    });
                    resetForm();
                    toast.success(resp.messages[0]);
                } catch (error) {
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
                document.getElementById('dialog').close();
                // Update the address state with the new data
                setAddress((prevAddress) => {
                    const updatedAddresses = [...prevAddress.deliveryAddresses, resp.data];
                    return {
                        ...prevAddress,
                        deliveryAddresses: updatedAddresses,
                    };
                });
                resetForm();
                toast.success(resp.messages[0]);
            } catch (error) {
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
        document.getElementById('dialog').showModal();
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            const resp = await addressServices.deleteDeliveryAddress(token, addressId);
            toast.success(resp.messages[0]);

            const updatedAddresses = address.deliveryAddresses.filter((item) => item.id !== addressId);
            setAddress({
                ...address,
                deliveryAddresses: updatedAddresses,
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', '));
            } else {
                toast.error('Có lỗi xảy ra.');
            }
        }
    };

    const handleSetDefaultAddress = async (addressId) => {
        try {
            const resp = await addressServices.setDefaultAddress(token, addressId);
            toast.success(resp.messages[0]);
        } catch (error) {
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
        <div className="grid grid-cols-4 my-5">
            <NavProfile />
            <div className="card col-span-3 bg-white shadow-lg">
                <div className="m-4">
                    <div className="border-b-2 pb-5">
                        <div className="grid grid-cols-2">
                            <div>
                                <div className="text-lg font-bold">Địa chỉ của tôi</div>
                                <div className="font-bold text-error">Thông tin về địa chỉ nhận hàng và trả hàng</div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="btn bg-primary btn-ghost text-white"
                                    onClick={() => {
                                        setIsUpdateMode(false);
                                        document.getElementById('dialog').showModal();
                                    }}
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
                                                <SubmitButton
                                                    text={isUpdateMode ? 'Cập nhật' : 'Thêm địa chỉ'}
                                                    color="primary"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>
                    <div className="m-10">
                        {address.length === 0 ? (
                            <h1 className="text-2xl font-bold text-error">
                                <AiOutlineWarning /> Vui lòng thêm địa chỉ nhận hàng!
                            </h1>
                        ) : (
                            address.deliveryAddresses.map((item) => (
                                <div key={item.id} className="my-5">
                                    <div className="grid grid-cols-2">
                                        <div>
                                            <span className="font-bold">{item.receiverName}</span> |{' '}
                                            <span className="text-info">{item.receiverPhone}</span>
                                            <div className="my-2">
                                                <p className="text-sm text-info">{item.deliveryAddress}</p>
                                            </div>
                                            <div className="flex text-center items-center space-x-2 p-2">
                                                {item.id === address.defaultAddressId ? (
                                                    <div className="text-primary flex items-center">
                                                        <BiTargetLock />
                                                        <span> Mặc định</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="flex text-blue-400 items-center ">
                                                            <BiPurchaseTag />
                                                            <button onClick={() => handleSetDefaultAddress(item.id)}>
                                                                Đặt làm mặc định
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="justify-end flex">
                                            <span
                                                className="text-primary mx-2 btn btn-sm"
                                                onClick={() => handleUpdateAddress(item.id)}
                                            >
                                                <GrUpdate />
                                                Cập nhật
                                            </span>
                                            <span
                                                className="text-primary btn btn-sm"
                                                onClick={() => handleDeleteAddress(item.id)}
                                            >
                                                Xóa
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-[0.5px]"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAddress;