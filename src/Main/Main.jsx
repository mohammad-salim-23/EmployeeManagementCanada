import { Outlet } from "react-router-dom";
import Navbar from "../Component/Common/Navbar/Navbar";
import Footer from "../Component/Common/Footer/Footer";


const Main = () => {
    return (
        <div>

            {/* Navbar */}
            <Navbar></Navbar>

            <Outlet></Outlet>

            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default Main;