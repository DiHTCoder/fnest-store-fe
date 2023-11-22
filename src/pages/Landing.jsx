import {
    Sliders,
    EvaluateSlider,
    FeaturedProducts,
    Title,
    Stylist,
    Services,
    Contact,
    Purpose,
    Collection,
    Inspiration,
} from '../components';
import productServices from '../services/productServices';

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
                <Title text="Mục tiêu" />
                <Purpose />
                <Title text="Bộ sưu tập" />
                <Collection />
                <Title text=" Gợi ý phong cách thiết kế đẹp" />
                <Stylist />
                <Contact />
                <Title text="Đánh giá" />
                <EvaluateSlider />
                <Title text="Góc cảm hứng" />
                <Inspiration />
                <Title text="Dịch vụ" />
                <Services />
            </div>
        </main>
    );
};

export default Landing;
