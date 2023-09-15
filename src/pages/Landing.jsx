import {
    Sliders,
    EvaluateSlider,
    TopProduct,
    Title,
    Stylist,
} from '../components';

const Landing = () => {
    return (
        <main>
            <Sliders />
            <div className="h-[11500px]">
                <Title text="Ưu đãi tốt" />
                <TopProduct />
                <Title text="Đánh giá thực tế" />
                <EvaluateSlider />
                <Title text="Dịch vụ" />
                <Title text=" Gợi ý phong cách thiết kế đẹp" />
                <Stylist />
            </div>
        </main>
    );
};

export default Landing;
