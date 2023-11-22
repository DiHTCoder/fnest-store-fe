import React from 'react';
import { ProductsGrid } from './index.js';
import { useLoaderData } from 'react-router-dom';

const FeaturedProducts = () => {
    const { products } = useLoaderData();

    return (
        <section className="">
            <div className="text-center my-3">
                <ProductsGrid products={products} columns="4" />
            </div>
        </section>
    );
};

export default FeaturedProducts;
