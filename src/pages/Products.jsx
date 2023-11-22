import { Banner, ProductsContainer } from '../components';
import banner2 from '../assets/banner/banner-2.jpg';

const Products = () => {
    return (
        <>
            <Banner name="Sản phẩm" url="products" image={banner2} />
            <ProductsContainer />
        </>
    );
};

export default Products;
