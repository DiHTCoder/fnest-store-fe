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
import { Link } from 'react-router-dom';
import productServices from '../services/productServices';
import banner from '../assets/banner/last-banner.png';
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
                <Title text="Nổi bật" />
                <FeaturedProducts />
                <Title text="Mục tiêu" />
                <Purpose />
                <Title text="Bộ sưu tập" />
                <Collection />
                <Title text=" Gợi ý phong cách thiết kế đẹp" />
                <Stylist />
                <Contact />
                <Title text="Sứ mệnh" />
                <EvaluateSlider />
                <Title text="Góc cảm hứng" />
                <Inspiration />
                <Title text="Dịch vụ" />
                <Services />
                <div className="w-full relative flex min-h-[380px] items-center justify-center lg:min-h-[480px] my-10">
                    <div className="absolute inset-0 bottom-0 left-0 right-0 top-0">
                        <img src={banner} alt="" className="h-full w-full object-cover" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 text-center mb-4">
                        <Link to="products">
                            <button className="btn btn-outline btn-info py-2 px-4 rounded">Mua sắm ngay</button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Landing;
