import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import ProductCard from "./ProductCard/ProductCard";


const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <ProductCard />
            <Faq></Faq>
        </div>
    );
};

export default Home;