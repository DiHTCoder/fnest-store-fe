import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import productServices from '../services/productServices';
import collectionServices from '../services/collectionServices';
import { Filters, Loading, Banner, ProductsGrid, ProductsList } from '../components';
import { BsFillGridFill, BsList } from 'react-icons/bs';

const CollectionDetail = () => {
    const selectedCollection = useSelector((stata) => stata.collections.selectedCollection);
    const [products, setProducts] = useState([]);
    const [collection, setCollection] = useState({});
    const [layout, setLayout] = useState('grid');
    console.log(products);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoomById = async () => {
            setIsLoading(true);
            try {
                const respProducts = await productServices.getProductsByCollection(
                    selectedCollection,
                    0,
                    12,
                    'name.desc',
                );
                const respCollection = await collectionServices.getCollectionById(selectedCollection);
                setProducts(respProducts.data);
                setCollection(respCollection.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                setIsLoading(false);
            }
        };
        fetchRoomById();
    }, [selectedCollection]);

    const setActiveStyles = (pattern) => {
        return `text-xl btn btn-circle btn-sm ${
            pattern === layout ? 'btn-info text-white' : 'btn-ghost text-based-content'
        }`;
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Banner
                        name={`Bộ sưu tập ${collection.name}`}
                        url={`collections/${collection.id}`}
                        image={collection.imageUrl}
                    />
                    <Filters />
                    <div className="flex justify-between items-center my-3 border-b border-base-300 py-5">
                        <h2 className="text-lg font-bold">Tất cả sản phẩm của bộ sưu tập</h2>
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
                                {/* ( Có {products ? products.content.length : 0} sản phẩm được tìm thấy) */}
                            </h2>
                        </div>
                    </div>
                    {products.content != null ? (
                        layout === 'grid' ? (
                            <ProductsGrid products={products} />
                        ) : (
                            <ProductsList products={products} />
                        )
                    ) : (
                        <h2>Không có sản phẩm nào</h2>
                    )}
                </>
            )}
        </>
    );
};

export default CollectionDetail;
