import React, { useEffect, useState } from 'react';
import { CgMenuRight } from 'react-icons/cg';
import roomServices from '../services/roomServices';
import { useDispatch, useSelector } from 'react-redux';
import productServices from '../services/productServices';
import noProduct from '../assets/cart/gio-hang-trong.jpg';
import { Loading, Filters, ProductsGrid } from '../components';

const RoomsContainer = ({ roomId }) => {
    const dispatch = useDispatch();

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
                if (respCate.data.length > 0) {
                    handleCategoryClick(respCate.data[0]);
                }
            } catch (error) {
                // Xử lý lỗi nếu cần
            } finally {
                setIsLoading(false);
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
            // Xử lý lỗi nếu cần
        }
    };
    return (
        <>
            {categories.length > 0 ? (
                <div className="grid grid-cols-5 grid-flow-col gap-4 my-10">
                    <div className="col-span-1 ...">
                        <ul className="menu bg-white w-56 rounded-box">
                            <div className="flex items-center gap-2 font-bold my-2">
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
                                                className="w-12 h-12 object-cover rounded-full"
                                            />
                                            <a>{category.name}</a>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="col-span-4 ...">
                        {products.content ? (
                            <>
                                <div className="flex justify-between items-center border-b border-base-300">
                                    <h2 className="text-sm font-bold">
                                        Có {products.content.length} sản phẩm thuộc phòng
                                    </h2>
                                </div>
                                <ProductsGrid products={products} columns="3" />
                            </>
                        ) : (
                            <div>
                                <h2 className="text-center text-2xl font-bold">Không tìm thấy sản phẩm!!!</h2>
                                <img src={noProduct} alt="" className="w-[400px]" />
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
    );
};

export default RoomsContainer;
