import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Footer, Loading, Sliders } from '../components';

const HomeLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    return (
        <>
            <Header />
            {isPageLoading ? (
                <Loading />
            ) : (
                <section className="align-element">
                    <Outlet />
                </section>
            )}
            <Footer />
        </>
    );
};

export default HomeLayout;
