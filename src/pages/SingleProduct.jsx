import { formatPrice } from '../utils/helpers';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { Stars, ProductsTab, Breadcrumb, Loading } from '../components';
import { useParams } from 'react-router-dom';
import productServices from '../services/productServices';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, getTotals } from '../features/cart/cartSlice';
import { addItemToFavourite } from '../features/favourite/favouriteSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState(1);
    const { name, price, description, size, material, sold, inStock, featured, categoryId, collectionId, thumbnail } =
        product;

    useEffect(() => {
        const fetchProductById = async () => {
            setIsLoading(true);
            try {
                const response = await productServices.getProductDetail(id);
                setProduct(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching room:', error);
                setIsLoading(false);
            }
        };
        fetchProductById();
    }, [id]);

    const handleAddToFavourite = () => {
        dispatch(addItemToFavourite(product));
    };
    const handleAddToCart = () => {
        dispatch(addItemToCart({ ...product, quantity: amount }));
        dispatch(getTotals());
    };
    const handleAmountChange = (event) => {
        const inputAmount = parseInt(event.target.value, 10);

        if (!isNaN(inputAmount) && inputAmount >= 1 && inputAmount <= inStock) {
            setAmount(inputAmount);
        }
    };
    const handleIncrease = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount + 1;
            if (tempAmount > inStock) {
                tempAmount = inStock;
            }
            return tempAmount;
        });
    };

    const handleDecrease = () => {
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
            <Breadcrumb url="products" page="Chi tiết sản phẩm" />
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <img src={thumbnail} alt={name} />
                </div>
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-4xl font-bold">{name}</h2>
                        <AiOutlineHeart className="w-[30px] h-[30px] text-primary transition-colors duration-300" />
                    </div>

                    <div className="flex justify-between p-2">
                        <div className="flex">
                            <Stars />
                            (100 đánh giá)
                        </div>
                        <span>
                            <b>Đã bán: </b>
                            {sold}
                        </span>
                    </div>
                    <div className="text-lg">
                        <span className="text-primary text-2xl font-bold pr-4">{formatPrice(price)}</span>
                        <span className="line-through">{formatPrice(price)}</span>
                    </div>
                    <div className="pb-2 border-b-2">
                        <span className="text-sm tex-base-300">SKU:{product.id}</span>
                    </div>
                    <p className="py-2">
                        <b>Chất liệu: </b>
                        {material}
                    </p>
                    <p className="py-2">
                        <b>Kích thước: </b>
                        {size}
                    </p>
                    <p className="py-2">
                        <b>Số lượng còn lại: </b>
                        {inStock}
                    </p>
                    <p className="py-2 leading-loose">
                        <b>Mô tả: </b>
                        {description}
                    </p>

                    <div className="mt-3">
                        <label htmlFor="count" className="text-paragraph font-semibold text-base-content-300">
                            Số lượng
                        </label>
                        <div class="flex items-center border-gray-100 my-2">
                            <button
                                class="btn btn-ghost"
                                onClick={() => {
                                    handleDecrease(amount);
                                }}
                            >
                                -
                            </button>
                            <input
                                class="h-10 w-10 border bg-white text-center text-xs outline-none rounded-lg"
                                type="text"
                                value={amount}
                                min="1"
                                max={inStock}
                                inputmode="decimal"
                                onChange={handleAmountChange}
                            />
                            <button
                                class="btn btn-ghost"
                                onClick={() => {
                                    handleIncrease(amount);
                                }}
                            >
                                +
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <button className="btn btn-ghost bg-primary text-white" onClick={() => handleAddToCart()}>
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                className="btn btn-ghost bg-accent-focus text-white"
                                onClick={() => handleAddToFavourite()}
                            >
                                Thêm vào wishlist
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
