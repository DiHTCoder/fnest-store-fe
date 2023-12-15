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
        scrollTo(0, 0);
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
                <div className="grid grid-rows-3 grid-flow-col md:gap-2 gap-1">
                    <div className="col-span-2 row-span-3">
                        <img src={banner3} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                            <strong className="lg:text-6xl text-2xl">Ý tưởng về không gian sống</strong>
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
                <div className="gap-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-4">
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
