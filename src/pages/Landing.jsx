import {
    Sliders,
    EvaluateSlider,
    TopProduct,
    Title,
    Stylist,
    Services,
} from '../components';

const Landing = () => {
    return (
        <main>
            <Sliders />
            <div className="">
                <Title text="Ưu đãi tốt" />
                <TopProduct />
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
