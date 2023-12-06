import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner/banner-post1.jpg';
import banner2 from '../assets/banner/banner-post2.jpg';
import banner3 from '../assets/banner/banner-post3.jpg';
import { SingleStylist } from '../components';
import newServices from '../services/newServices';

const Post = () => {
    const [data, setData] = useState([]);
    const [currentTab, setCurrentTab] = useState(1);

    const fetchData = async () => {
        try {
            const response = await newServices.getAllNews(0, 12);
            setData(response.data.content);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filterPosts = () => {
        const startIndex = (currentTab - 1) * 3;
        const endIndex = startIndex + 3;
        return data.slice(startIndex, endIndex);
    };

    // Check if there is more than one tab
    const shouldRenderTabs = data.length > 3;
    return (
        <>
            <div className="carousel w-full h-[700px] relative rounded-lg my-4">
                <div className="grid grid-rows-3 grid-flow-col gap-2">
                    <div className="col-span-2 row-span-3">
                        <img src={banner3} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                            <strong className="text-6xl">Ý tưởng về không gian sống</strong>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-2">
                        <img src={banner1} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-2">
                        <img src={banner2} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            <section>
                <div className="px-[20px] gap-2 grid grid-cols-3 mt-4">
                    {filterPosts().map((post) => (
                        <SingleStylist key={post.id} {...post} />
                    ))}
                </div>
                {shouldRenderTabs && (
                    <div role="tablist" className="flex items-center justify-center tabs tabs-lifted my-4">
                        {[1, 2, 3].map((tab) => (
                            <button
                                key={tab}
                                role="tab"
                                className={`tab ${currentTab === tab ? 'tab-active' : ''}`}
                                onClick={() => setCurrentTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default Post;