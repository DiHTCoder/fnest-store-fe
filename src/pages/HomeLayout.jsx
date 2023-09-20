import { Outlet } from 'react-router-dom';
import { Header, Navbar, Menubar, Footer } from '../components';
const HomeLayout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Menubar />
            <section className="align-element">
                <Outlet />
            </section>
            <Footer />
        </>
    );
};

export default HomeLayout;
