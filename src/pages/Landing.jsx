import { Sliders, EvaluateSlider, FeaturedProducts, Title, Stylist, Services } from '../components';
import { customFetch } from '../services';
import productServices from '../services/productServices'; // Import hàm productsapi
const url = '/products?featured=true';
import { useState, useEffect } from 'react';

export const loader = async () => {
    const response = await customFetch(url);
    const products = response.data.data;
    return { products };
};

const Landing = () => {
    const [productData, setProductData] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const productList = await productServices.getFeaturedProducts();
    //     };
    //     fetchProducts();
    // }, []);

    return (
        <main>
            <div className="">
                <Sliders />
                <Title text="Ưu đãi tốt" />
                <FeaturedProducts />
                <Title text="Đánh giá thực tế" />
                <EvaluateSlider />
                <Title text="Dịch vụ" />
                <Services />
                <Title text=" Gợi ý phong cách thiết kế đẹp" />
                <Stylist />
            </div>
        </main>
    );
};

export default Landing;
