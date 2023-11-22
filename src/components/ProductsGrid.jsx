import React from 'react';
import { Product } from '.';

const ProductsGrid = ({ products, columns }) => {
    return (
        <div className={`grid lg:grid-cols-4 gap-2`}>
            {products.length > 0 ? (
                products.content.map((product) => {
                    return <Product key={product.id} product={product} />;
                })
            ) : (
                <>Không có sản phẩm</>
            )}
        </div>
    );
};

export default ProductsGrid;
