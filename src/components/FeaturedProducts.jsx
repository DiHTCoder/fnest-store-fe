import React from 'react';
import { useState } from 'react';
import menu from '../utils/menu.js';
import { ProductsGrid } from './index.js';

const allCategories = ['all', ...new Set(menu.map((item) => item.category))];
const FeaturedProducts = () => {
    const [categories, setCategories] = useState(allCategories);
    const [menuItems, setMenuItems] = useState(menu);

    return (
        <section className="">
            <div className="text-center my-3">
                {/* {categories.map((category, index) => {
                    return (
                        <button
                            type="button"
                            className="btn rounded-x-full cursor-pointer mx-1 hover:bg-[#f59e0b] hover:text-white bg-background "
                            key={index}
                            onClick={() => filterItems(category)}
                        >
                            {category}
                        </button>
                    );
                })} */}
                <ProductsGrid />
            </div>

            {/* {menuItems.map((menuItem) => {
                const { id, title, img, desc, price } = menuItem;
                return (
                    <article key={id} className="menu-item">
                        <img src={img} alt={title} className="photo" />
                        <div className="item-info">
                            <header>
                                <h4>{title}</h4>
                                <h4 className="price">${price}</h4>
                            </header>
                            <p className="item-text">{desc}</p>
                        </div>
                    </article>
                );
            })} */}
        </section>
    );
};

export default FeaturedProducts;
