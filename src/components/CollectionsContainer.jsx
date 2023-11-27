import React from 'react';
import { useEffect, useState } from 'react';
import { Loading } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { setCollectionsList, setSelectedCollection } from '../features/collection/collectionsSlice';
import collectionServices from '../services/collectionServices';
import { Link } from 'react-router-dom';

const CollectionsContainer = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.collections);
    const [collections, setCollections] = useState([]);
    const [readMore, setReadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getCollections = async () => {
            try {
                const collections = await collectionServices.getAllCollections();
                dispatch(setCollectionsList(collections.data));
                setCollections(collections.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching products:', error);
            }
        };
        getCollections();
    }, []);

    const handleCollectionClick = (id) => {
        dispatch(setSelectedCollection(id));
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex justify-between items-center my-3 border-b border-base-300 py-5">
                        <h2 className="text-lg font-bold">Tất cả bộ sưu tập của Fnest</h2>
                        <div className="flex items-center gap-3">
                            <h2 className="font-medium">
                                ( Có {data.currentCollection ? data.currentCollection.length : 0} bộ sưu tập được tìm
                                thấy)
                            </h2>
                        </div>
                    </div>
                    <div className="px-[20px] gap-2 grid grid-cols-3 mt-10">
                        {collections.map((collection) => {
                            return (
                                <Link
                                    to={`/collections/${collection.id}`}
                                    onClick={() => handleCollectionClick(collection.id)}
                                >
                                    <article className="bg-white border rounded-sm shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2">
                                        <img
                                            src={collection.imageUrl}
                                            alt="Ảnh"
                                            className="h-[20rem] rounded-tr-sm rounded-tl-sm w-full"
                                        />
                                        {/* <span className="absolute  top-0 right-0 p-1 text-white tracking-wide bg-primary rounded-tr-sm">
                                        ${price}
                                    </span> */}
                                        <div className="leading-6 m-2 font-think tracking-wide px-5">
                                            <h5 className="text-center m-2  font-semibold leading-6 text-xl">
                                                {collection.name}
                                            </h5>

                                            <p className="tracking-wide mb-2 text-justify">
                                                {readMore ? collection.name : `${collection.name.substring(0, 100)}...`}
                                                <button
                                                    className=" text-primary uppercase cursor-pointer"
                                                    onClick={() => setReadMore(!readMore)}
                                                >
                                                    {readMore ? 'Ẩn bớt' : 'Xem thêm'}
                                                </button>
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default CollectionsContainer;