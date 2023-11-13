import { Sliders, EvaluateSlider, FeaturedProducts, Title, Stylist, Services } from '../components';
import productServices from '../services/productServices'; // Import hàm productsapi

export const loader = async () => {
    const response = await productServices.getFeaturedProducts();
    const products = response.data;
    return { products };
};

const Landing = () => {
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
