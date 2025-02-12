import{ useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    const banners = [
        {
            id: 1,
            url: "https://images.herzindagi.info/her-zindagi-english/images/2024/10/14/article/image/Intel-Laptop-(1)-1728900589444.jpg",
            title: "Explore Cutting-Edge Laptops",
            subtitle: "High performance, stylish designs, best prices.",
        },
        {
            id: 2,
            url: "https://png.pngtree.com/background/20231017/original/pngtree-web-development-banner-enhances-creative-3d-rendered-mobile-mockup-with-laptop-picture-image_5592245.jpg",
            title: "Top Brands for Every Need",
            subtitle: "Find your next laptop with ease and confidence.",
        },
        {
            id: 3,
            url: "https://png.pngtree.com/background/20231017/original/pngtree-innovative-3d-mobile-mockup-paired-with-web-development-banner-and-laptop-picture-image_5592791.jpg",
            title: "Experience Ultimate Power",
            subtitle: "Push your limits with next-gen technology.",
        },
    ];

    const [current, setCurrent] = useState(0);

    // Function to move to the next slide
    const nextSlide = () => {
        setCurrent((prevCurrent) => (prevCurrent === banners.length - 1 ? 0 : prevCurrent + 1));
    };

    // Function to move to the previous slide
    const prevSlide = () => {
        setCurrent((prevCurrent) => (prevCurrent === 0 ? banners.length - 1 : prevCurrent - 1));
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);

        // Clear interval when component unmounts or on manual change
        return () => clearInterval(slideInterval);
    }, []);

    // Reset auto-slide interval on manual button click
    const handleManualChange = (direction) => {
        if (direction === "next") nextSlide();
        if (direction === "prev") prevSlide();
    };

    return (
        <div className="relative container mx-auto px-4 w-full h-[60vh] lg:h-[80vh] overflow-hidden">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={banner.url}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                        <h2 className="text-3xl lg:text-5xl font-extrabold mb-3 drop-shadow-md">
                            {banner.title}
                        </h2>
                        <p className="text-lg lg:text-2xl font-medium mb-6 drop-shadow-md">
                            {banner.subtitle}
                        </p>
                        <Link to={'/contact'}>
                            <button className="px-6 py-2 mt-2 bg-gradient-to-r from-primary to-green-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 ease-in-out">
                                Contact
                            </button>
                        </Link>
                    </div>
                </div>
            ))}

            {/* Navigation Controls */}
            <button
                onClick={() => handleManualChange("prev")}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
            >
                &#10094; {/* Left arrow */}
            </button>
            <button
                onClick={() => handleManualChange("next")}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
            >
                &#10095; {/* Right arrow */}
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === current ? "bg-blue-500" : "bg-gray-300"
                            } transition`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
