import React, { useState, useEffect } from 'react';
import { SingleStylist } from '.';
import newServices from '../services/newServices';

const Inspiration = () => {
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
    );
};

export default Inspiration;
