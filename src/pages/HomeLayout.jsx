import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Footer, Loading, TopHeader } from '../components';

const HomeLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';

    return (
        <>
            <TopHeader />
            <Header />
            {isPageLoading ? (
                <Loading />
            ) : (
                <section className="align-element min-h-screen">
                    <Outlet />
                </section>
            )}
            <Footer />
        </>
    );
};

export default HomeLayout;
