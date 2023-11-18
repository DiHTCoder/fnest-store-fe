import React from 'react';
import { Product } from '.';
const ProductsGrid = ({ products }) => {
    return (
        <div className="grid lg:grid-cols-4 gap-2">
            {products.content.map((product) => {
                return <Product key={product.id} product={product} />;
            })}
        </div>
    );
};

export default ProductsGrid;
