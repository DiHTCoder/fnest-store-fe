import {
    Sliders,
    EvaluateSlider,
    FeaturedProducts,
    Title,
    Stylist,
    Services,
} from '../components';
import { customFetch } from '../apis';
const url = '/products?featured=true';

export const loader = async () => {
    const response = await customFetch(url);
    const products = response.data.data;
    return { products };
};

const Landing = () => {
    return (
        <main>
            <Sliders />
            <div className="">
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
