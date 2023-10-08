import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Navbar, Menubar, Footer, Loading } from '../components';
const HomeLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    return (
        <>
            <div className="bg-white">
                <Header />
                <Navbar />
                <Menubar />
            </div>
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
