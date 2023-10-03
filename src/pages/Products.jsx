import {
    Filters,
    Pagination,
    ProductsContainer,
    Breadcrumb,
} from '../components';
const Products = () => {
    return (
        <>
            <Breadcrumb url="products" page="Sản phẩm" />
            <Filters />
            <ProductsContainer />
            <Pagination />
        </>
    );
};

export default Products;
