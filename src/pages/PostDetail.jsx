import React from 'react';
import { useState, useEffect } from 'react';
import { Loading } from '../components';
import { useParams } from 'react-router-dom';
import newServices from '../services/newServices';

const PostDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        scrollTo(0, 0);
        const fetchData = async () => {
            const resp = await newServices.getNewById(id);
            setData(resp.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="my-10 text-center">
                    <h1 className="text-4xl my-2">Gợi ý phong cách căn phòng</h1>
                    <div className="text-justify text-lg leading-loose">{data.description}</div>
                    <div className="my-4 mx-auto max-w-full h-auto" style={{ maxWidth: '800px' }}>
                        <div className="flex flex-wrap justify-center">
                            {data.banners.map((banner, index) => (
                                <img
                                    key={index}
                                    src={banner}
                                    alt={`Image ${index + 1}`}
                                    className="max-w-full h-auto m-2"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostDetail;
