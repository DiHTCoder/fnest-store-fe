import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Navbar, Sliders, Footer, Loading } from '../components';
const HomeLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    return (
        <>
            <div className="bg-white">
                <Header />
                {/* <Menubar /> */}
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
