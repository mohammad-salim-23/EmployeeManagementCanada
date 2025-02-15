import { useState } from "react";
import useAllPaymentHistory from "../../../Component/hooks/useAllPaymentHistory";

const PaymentHistory = () => {
    // Fetching payment history data using a custom hook
    const [paymentHistory, isLoading] = useAllPaymentHistory();

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Calculate pagination details
    const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPayment = paymentHistory.slice(startIndex, startIndex + itemsPerPage);

    // Function to handle page number click
    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

    // Function to navigate to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Function to navigate to the next page
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Function to generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - (maxVisiblePages - 1));
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    // Display loading spinner while fetching data
    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto mx-auto container">
            {/* Page Title */}
            <div className="text-center">
                <h1 className="text-3xl font-semibold my-6">Total Payment History: {paymentHistory.length}</h1>
            </div>

            {/* Payment History Table */}
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead>
                    <tr className="text-left">
                        <th className="px-4 py-3 text-xl">Name</th>
                        <th className="px-4 py-3 text-xl">Email</th>
                        <th className="px-4 py-3 text-xl">Salary</th>
                        <th className="px-4 py-3 text-xl">Last Payment Date</th>
                        <th className="px-4 py-3 text-xl">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPayment.map(history => (
                        <tr key={history._id} className="border hover:bg-blue-200">
                            <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">{history.employeeName}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{history.employeeEmail}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{history.employeeSalary}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{history.lastSalaryPaid}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{history.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 text-white bg-blue-600 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {getPageNumbers().map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageClick(number)}
                        className={`px-4 py-2 rounded-full ${number === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 text-white bg-blue-600 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaymentHistory;