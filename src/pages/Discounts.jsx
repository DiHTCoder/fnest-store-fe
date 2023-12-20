import React from 'react';
import { Banner, Loading } from '../components';
import sale from '../assets/sale/sale-coupon.png';
import { useState, useEffect } from 'react';
import couponServices from '../services/couponServices';
import { formatDate, formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
const Discounts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await couponServices.getAllCoupon();
            setCoupons(resp.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Banner name="Mã giảm giá" url="discounts" image={sale} />
                    <div>
                        {coupons.length > 0 ? (
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 my-2">
                                {coupons.map((coupon) => {
                                    return (
                                        <>
                                            <div className="card w-70 bg-base-100 shadow-lg">
                                                <div className="card-body bg-[#ECEFF1]">
                                                    <h2 className="card-title text-primary">{coupon.code}</h2>
                                                    <div className="flex ">
                                                        <p className="font-bold text-success">Giảm tối đa:</p>
                                                        <p>{formatPrice(coupon.maxDiscount)}</p>
                                                    </div>
                                                    <div className="flex ">
                                                        <p className="font-bold text-success">ĐH tối thiểu:</p>
                                                        <p>{formatPrice(coupon.minOrderValue)}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <p className="font-bold text-success">Ngày hết hạn:</p>
                                                        <p>{formatDate(coupon.endDate)}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="font-bold text-success">Thông tin:</p>
                                                        <p className="text-justify">{coupon.description}</p>
                                                    </div>
                                                    <div className="card-actions justify-end">
                                                        <Link to="/products">
                                                            <button className="btn btn-outline btn-info">
                                                                Mua sắm ngay
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        ) : (
                            <>Không có mã giảm giá nào</>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Discounts;
