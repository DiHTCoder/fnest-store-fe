import { Banner, ProductsContainer } from '../components';
import banner3 from '../assets/product/products.jpg';

const Products = () => {
    return (
        <>
            <Banner name="Sản phẩm" url="products" image={banner3} />
            <ProductsContainer />
        </>
    );
};

export default Products;
