import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Product } from '.';
const ProductsGrid = () => {
    const { products } = useLoaderData();
    return (
        <div className="grid lg:grid-cols-4 gap-2">
            {products.map((product) => {
                {
                    /* const dollarsAmount = formatPrice(price); */
                }
                return <Product key={product.id} product={product} />;
            })}
        </div>
    );
};

export default ProductsGrid;
