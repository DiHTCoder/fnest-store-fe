import { Outlet } from 'react-router-dom';
import { Header, Navbar, Menubar } from '../components';
const HomeLayout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Menubar />
            <section className="align-element py-10">
                <Outlet />
            </section>
        </>
    );
};

export default HomeLayout;
