import React, { useEffect, useState } from 'react';
import { CgMenuRight } from 'react-icons/cg';
import roomServices from '../services/roomServices';
import { useSelector } from 'react-redux';
import productServices from '../services/productServices';
import noProduct from '../assets/cart/gio-hang-trong.jpg';
import { Loading, Product } from '../components';

const RoomsContainer = ({ roomId }) => {
    const data = useSelector((state) => state.products);

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            setIsLoading(true);
            try {
                const respCate = await roomServices.getCategoryByRoomId(roomId);
                setCategories(respCate.data);
                setIsLoading(false);
                if (respCate.data.length > 0) {
                    handleCategoryClick(respCate.data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategory();
    }, [roomId]);

    const handleCategoryClick = async (category) => {
        try {
            const respProduct = await productServices.getProductsByCategory(category.name, 0, 12, 'name.desc');
            setProducts(respProduct.data);
            setSelectedCategory(category.name);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {categories.length > 0 ? (
                        <div className="md:grid lg:grid-cols-5 md:grid-cols-8 md:grid-flow-col gap-4 my-5">
                            <div className="lg:col-span-1 md:col-span-2 mt-5">
                                <ul className="menu bg-white lg:w-56 md:w-30 w-full rounded-box">
                                    <div className="flex items-center gap-1 font-bold my-2">
                                        <CgMenuRight />
                                        Tất cả danh mục ({categories.length})
                                    </div>
                                    {categories.map((category) => {
                                        return (
                                            <li key={category.id} onClick={() => handleCategoryClick(category)}>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={category.image || noProduct}
                                                        alt={category.name}
                                                        className="lg:w-12 lg:h-12 w-6 h-6 object-cover rounded-full"
                                                    />
                                                    <a className="lg:text-base text-sm">{category.name}</a>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="lg:col-span-4 md:col-span-6">
                                {products.content ? (
                                    <>
                                        <div className="flex justify-between items-center border-b border-base-300">
                                            <h2 className="text-sm font-bold">
                                                Có {products.content.length} sản phẩm thuộc phòng
                                            </h2>
                                        </div>
                                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 my-10">
                                            {products.content.length > 0 ? (
                                                products.content.map((product) => {
                                                    return <Product key={product.id} product={product} />;
                                                })
                                            ) : (
                                                <>Không tìm thấy sản phẩm</>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <div>
                                            <img src={noProduct} alt="" className="w-[400px]" />
                                            <h2 className="text-center text-2xl">Không tìm thấy sản phẩm!!!</h2>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center my-20">
                            <div>
                                <h2 className="text-center text-2xl font-bold">Không tìm thấy sản phẩm!!!</h2>
                                <img src={noProduct} alt="" className="w-[400px]" />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default RoomsContainer;
