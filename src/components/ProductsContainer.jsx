import React from 'react';
import { ProductsGrid, Pagination, ProductsList, Loading, Filters } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import productServices from '../services/productServices';
import { setProductsList } from '../features/product/productsSlice';
import { useEffect, useState } from 'react';
const ProductsContainer = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.products);
    const filters = useSelector((state) => state.filters);
    const [layout, setLayout] = useState('grid');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        window.scrollTo(0, 0);
        const getProducts = async () => {
            try {
                const products = await productServices.getAllProducts(
                    filters.search,
                    0,
                    10,
                    filters.sortBy,
                    filters.priceMin,
                );
                dispatch(setProductsList(products.data));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [dispatch, filters]);

    const setActiveStyles = (pattern) => {
        return `text-xl btn btn-circle btn-sm ${
            pattern === layout ? 'btn-info text-white' : 'btn-ghost text-based-content'
        }`;
    };
    const handlePageChange = async (page) => {
        setIsLoading(true);
        try {
            const products = await productServices.getAllProducts('', page, 2, 'name.desc');
            setIsLoading(false);

            dispatch(setProductsList(products.data));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Filters />
                    <div className="flex justify-between items-center my-3 border-b border-base-300 py-5">
                        <h2 className="text-lg font-bold">Tất cả sản phẩm của cửa hàng</h2>
                        <div className="flex items-center gap-3">
                            <div className="flex gap-x-4">
                                <button
                                    type="button"
                                    onClick={() => setLayout('grid')}
                                    className={setActiveStyles('grid')}
                                >
                                    <BsFillGridFill />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLayout('list')}
                                    className={setActiveStyles('list')}
                                >
                                    <BsList />
                                </button>
                            </div>
                            <h2 className="font-medium">
                                ( Có {data ? data.content.length : 0} sản phẩm được tìm thấy)
                            </h2>
                        </div>
                    </div>
                    {data ? (
                        layout === 'grid' ? (
                            <ProductsGrid products={data} columns="4" />
                        ) : (
                            <ProductsList products={data} />
                        )
                    ) : (
                        <h2>Không có sản phẩm nào</h2>
                    )}
                    {data.totalPages > 1 ? (
                        <Pagination
                            totalPages={data.totalPages}
                            currentPage={data.currentPage}
                            onPageChange={handlePageChange}
                        />
                    ) : (
                        <></>
                    )}
                </>
            )}
        </>
    );
};

export default ProductsContainer;
