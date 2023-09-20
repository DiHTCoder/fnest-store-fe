import { useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { customFetch } from '../apis';
import { AiOutlineHeart } from 'react-icons/ai';
import { Stars, ProductsTab } from '../components';
import { HiMiniMinus } from 'react-icons/hi2';
import { HiMiniPlus } from 'react-icons/hi2';

export const loader = async ({ params }) => {
    const response = await customFetch(`/products/${params.id}`);
    return { product: response.data.data };
};

const SingleProduct = () => {
    const { product } = useLoaderData();
    const { image, title, price, description, colors, company } =
        product.attributes;
    const vndPrice = formatPrice(price);
    const [amount, setAmount] = useState(1);
    const increase = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount + 1;
            // if (tempAmount > stock) {
            //   tempAmount = stock
            // }
            return tempAmount;
        });
    };
    const decrease = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount - 1;
            if (tempAmount < 1) {
                tempAmount = 1;
            }
            return tempAmount;
        });
    };
    return (
        <>
            <div className="text-md pb-6 breadcrumbs">
                <ul>
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/products">Chi tiết sản phẩm</Link>
                    </li>
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <img src={image} alt="" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-4xl font-bold">{title}</h2>
                        <AiOutlineHeart className="w-[30px] h-[30px] text-primary transition-colors duration-300" />
                    </div>

                    <div className="flex justify-between p-2">
                        <div>
                            {' '}
                            <Stars />
                            (100 đánh giá)
                        </div>
                        <span>
                            <b>Đã bán: </b>1
                        </span>
                    </div>
                    <div className="text-lg  ">
                        <span className="text-primary text-2xl font-bold pr-4">
                            {vndPrice}
                        </span>
                        <span className="line-through">11111000 đ</span>
                    </div>
                    <div className="pb-2 border-b-2">
                        <span className="text-sm tex-base-300">
                            SKU:{product.id}
                        </span>
                    </div>
                    <p className="py-2">
                        <b>Chất liệu: </b>
                        Gỗ cao su tự nhiên
                    </p>
                    <p className="py-2">
                        <b>Kích thước: </b>
                        Dài 200cm x Rộng 92cm x Cao 78cm
                    </p>
                    <p className="py-2">
                        <b>Số lượng còn lại: </b>
                        30
                    </p>
                    <p className="py-2 leading-loose">
                        <b>Mô tả: </b>
                        {description}
                    </p>
                    <p className="py-2">
                        <b>Công ty: </b>
                        {company}
                    </p>
                    <div className="mt-3">
                        <label
                            htmlFor="count"
                            className="text-paragraph font-semibold text-base-content-300"
                        >
                            Số lượng
                        </label>
                        <div className="my-2">
                            <button className="border-2 w-[50px] h-[50px]">
                                <HiMiniMinus className="mx-4" />
                            </button>
                            <input
                                id="amount"
                                value={amount}
                                type="text"
                                class="border-2 w-[50px] h-[50px] text-center"
                            ></input>
                            <button className="border-2 w-[50px] h-[50px]">
                                <HiMiniPlus className="mx-4" />
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <button className="btn btn-ghost bg-primary text-white">
                                Thêm vào giỏ hàng
                            </button>
                            <button className="btn btn-ghost bg-accent-focus text-white">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductsTab />
        </>
    );
};

export default SingleProduct;
