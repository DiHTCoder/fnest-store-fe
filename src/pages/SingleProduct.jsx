import { formatDate, formatPrice } from '../utils/helpers';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { Stars, Breadcrumb, Loading } from '../components';
import { useParams } from 'react-router-dom';
import productServices from '../services/productServices';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, getTotals } from '../features/cart/cartSlice';
import { addItemToFavourite } from '../features/favourite/favouriteSlice';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import avatar from '../assets/images/avatar.jpg';
import no_evalute from '../assets/images/no-evalute.jpg';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [amount, setAmount] = useState(1);
    const [productReviews, setProductReviews] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const { name, price, description, size, salePrice, material, reviewAmount, sold, inStock, totalReviewPoint } =
        product;

    const averageRating = Math.round((totalReviewPoint / reviewAmount) * 2) / 2;

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProductById = async () => {
            setIsLoading(true);
            try {
                const respProduct = await productServices.getProductDetail(id);
                setProduct(respProduct.data);
                setSelectedImage(respProduct.data.thumbnail);
                setSelectedImageIndex(null);
                const respReviews = await productServices.getAllProductReviews(respProduct.data.name, 0, 12);
                setProductReviews(respReviews.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
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

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setSelectedImageIndex(imageUrl);
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Breadcrumb url="products" page="Chi tiết sản phẩm" />
                    <div className="grid lg:grid-cols-2 grid-col-1 gap-10">
                        <div>
                            <img src={selectedImage} alt={name} className="border-solid border-2 rounded-xl" />
                            <div className="grid md:grid-cols-6 grid-cols-4 gap-1 mt-2 ">
                                {product.imageUrls?.map((url) => {
                                    return (
                                        <img
                                            key={url}
                                            src={url}
                                            alt={product.name}
                                            className={`rounded-xl object-fit h-[75px] border-solid border-2 ${
                                                selectedImageIndex === url ? 'border-info' : 'border-gray-300'
                                            }`}
                                            onClick={() => handleImageClick(url)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h2 className="lg:text-4xl md:text-2xl text-base font-bold">{name}</h2>
                                <AiOutlineHeart className="w-[30px] h-[30px] text-primary transition-colors duration-300" />
                            </div>

                            <div className="flex justify-between p-2 lg:text-base text-sm">
                                <div className="flex items-center">
                                    <Stars />({reviewAmount} đánh giá)
                                </div>
                                <span>
                                    <b>Đã bán: </b>
                                    {sold}
                                </span>
                            </div>
                            {product.onSale ? (
                                <div className="lg:text-lg text-base">
                                    <span className="text-primary font-bold pr-4">{formatPrice(salePrice)}</span>
                                    <span className="line-through">{formatPrice(price)}</span>
                                </div>
                            ) : (
                                <div className="lg:text-lg text-base">
                                    <span className="text-primary text-2xl font-bold pr-4">{formatPrice(price)}</span>
                                </div>
                            )}
                            <div className="lg:text-base text-sm">
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
                            </div>

                            <div className="mt-3">
                                <label
                                    htmlFor="count"
                                    className="text-paragraph font-semibold lg:text-base-content-300 text-sm"
                                >
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
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <button
                                        className="btn btn-ghost bg-primary text-white"
                                        onClick={() => handleAddToCart()}
                                    >
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
                    <div className="card w-full bg-base-100 shadow-xl my-4">
                        <div className="md:m-10 m-4 lg:text-base text-sm">
                            <div className="font-bold">TỔNG QUAN ĐÁNH GIÁ SẢN PHẨM</div>
                            {productReviews && productReviews.content.length > 0 ? (
                                <>
                                    <div className="flex gap-2 lg:mb-10 mb-2">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index}>
                                                {index + 0.5 === averageRating ? (
                                                    <FaStarHalfAlt className="w-6 h-6 text-amber-500" />
                                                ) : index < averageRating ? (
                                                    <FaStar className="w-6 h-6 text-amber-500" />
                                                ) : (
                                                    <FaRegStar className="w-6 h-6 text-amber-500" />
                                                )}
                                            </span>
                                        ))}
                                        {!isNaN(averageRating) && (
                                            <p>
                                                ({averageRating} sao / {reviewAmount} đánh giá)
                                            </p>
                                        )}
                                    </div>
                                    {productReviews?.content.length > 0 &&
                                        productReviews.content.map((review) => {
                                            return (
                                                <>
                                                    <div className=" grid md:grid-cols-10 grid-cols-6">
                                                        <div>
                                                            <img
                                                                src={avatar}
                                                                alt="Ảnh người dùng"
                                                                className="w-12 h-12 rounded-full"
                                                            />
                                                        </div>
                                                        <div className="col-span-9">
                                                            <div>
                                                                <p className="font-bold">{review.reviewerName}</p>
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, index) =>
                                                                        index < review.point ? (
                                                                            <FaStar
                                                                                key={index}
                                                                                className="w-4 h-4 text-amber-500"
                                                                            />
                                                                        ) : (
                                                                            <FaRegStar
                                                                                key={index}
                                                                                className="w-4 h-4 text-amber-500"
                                                                            />
                                                                        ),
                                                                    )}
                                                                </div>
                                                                <p className="text-sm">
                                                                    Ngày đánh giá: {formatDate(review.createdAt)}
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 text-sm">
                                                                <div className="flex">
                                                                    <p>Chất lượng sản phẩm:</p>
                                                                    <p>{review.point === 1 && 'Tệ'}</p>
                                                                    <p>{review.point === 2 && 'Không hài lòng'}</p>
                                                                    <p>{review.point === 3 && 'Bình thường'}</p>
                                                                    <p>{review.point === 4 && 'Hài lòng'}</p>
                                                                    <p>{review.point === 5 && 'Tuyệt vời'}</p>
                                                                </div>

                                                                <p>{review.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="divider"></div>
                                                </>
                                            );
                                        })}
                                </>
                            ) : (
                                <>
                                    <p className="text-center">Không có đánh giá nào liên quan</p>
                                    <div className="flex items-end justify-center">
                                        <img src={no_evalute} alt="" className="w-1/4" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
            ;{/* <ProductsTab /> */}
        </>
    );
};

export default SingleProduct;
