import React from 'react';
import { Banner, CollectionsContainer } from '../components';
import banner3 from '../assets/product/banner2.jpg';

const Collections = () => {
    return (
        <>
            <Banner name="Bộ sưu tập" url="collections" image={banner3} />
            <CollectionsContainer />
        </>
    );
};

export default Collections;
