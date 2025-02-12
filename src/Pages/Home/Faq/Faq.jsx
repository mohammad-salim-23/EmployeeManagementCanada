
const Faq = () => {
    const faqs = [
        {
            question: "What types of laptops are available on LaptopGallery?",
            answer: "LaptopGallery offers a wide range of laptops, including gaming, business, ultra-portable, and educational models from popular brands like Dell, HP, Asus, Apple, and more."
        },
        {
            question: "Do you provide warranties for the laptops?",
            answer: "Yes, all laptops purchased from LaptopGallery come with manufacturer warranties. Warranty periods and coverage may vary depending on the brand and model."
        },
        {
            question: "How can I choose the best laptop for my needs?",
            answer: "We recommend browsing through our categories based on your specific use case, such as gaming, business, or creative work. Each product page provides detailed specifications to help you make an informed choice."
        },
        {
            question: "Can I return or exchange a laptop after purchase?",
            answer: "Yes, we offer a 14-day return policy for all laptops. Please ensure the product is in original condition with all packaging and accessories. For more details, view our Return Policy page."
        },
        {
            question: "What payment methods are accepted on LaptopGallery?",
            answer: "We accept all major credit/debit cards, bank transfers, and popular digital wallets. We are also working on adding EMI options for certain models."
        },
        {
            question: "Is there a way to track my order?",
            answer: "Yes, once your order is shipped, you’ll receive a tracking number via email. You can use this number on our Order Tracking page to monitor the delivery status."
        },
        {
            question: "Are there any discounts available?",
            answer: "LaptopGallery offers seasonal discounts and occasional brand promotions. You can subscribe to our newsletter to stay updated on special offers."
        },
    ];

    return (
        <section className="faq-section container mx-auto px-4 bg-gray-100 p-8 rounded-lg shadow-md my-8">
            <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faq;
