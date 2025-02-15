import { useState } from "react";
import useAllPaymentHistory from "../../../Component/hooks/useAllPaymentHistory";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Component/hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SalaryPay = () => {
    // Fetching payment history data using a custom hook
    const [paymentHistory, isLoading, refetch] = useAllPaymentHistory();
    const [isOpen, setIsOpen] = useState(false);  // State to track which employee is selected for payment
    const axiosPublic = useAxiosPublic();  // Axios hook for making API requests

    // Using react-hook-form to manage form state
    const { register, handleSubmit, reset } = useForm();

    // onSubmit function for handling the form submission
    const onSubmit = async (data) => {
        try {
            // Send API request to update salary
            const result = await axiosPublic.patch('/api/v1/salaryPay/update-salary', {
                email: data.employeeEmail,
                newSalary: data.employeeSalary
            });

            if (result.data.message === 200) {
                // Show SweetAlert success modal after the update is successful
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Payment Successfully Completed",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // Show error modal if update fails
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to update Customer type.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        } catch (error) {
            // Handle any errors that occur during the API call or other processes
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "There was an issue updating the salary, please try again later."
            });
            console.error("Error updating salary:", error);
        } finally {
            // Reset the form and refetch data, regardless of success or failure
            reset();
            refetch();
        }
    };

    // Trigger refetch to load payment history
    refetch();

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
                <h1 className="text-3xl font-semibold my-6 text-blue-700">Employ Payment: {paymentHistory.length}</h1>
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
                        <tr key={history._id} className="border hover:bg-blue-200 ">
                            <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">{history.employeeName}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{history.employeeEmail}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{history.employeeSalary}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{history.lastSalaryPaid}</td>
                            <td onClick={() => setIsOpen(history)} className="whitespace-nowrap px-4 py-4 text-xl text-center rounded-2xl p-4 cursor-pointer bg-blue-400 hover:bg-blue-300 text-white font-semibold ">Pay Now</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for salary payment */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
                        {/* Close Button (Top Right Corner) */}
                        <button
                            className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                            Payment Details
                        </h2>

                        {/* Form for payment submission */}
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Employee Name input */}
                            <div className="my-2">
                                <label className="text-gray-700 font-semibold mb-2">Employee Name</label>
                                <input
                                    className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal bg-blue-200 cursor-not-allowed"
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={`${isOpen?.employeeName}`}
                                    {...register("employeeName", { required: true })}
                                    disabled />
                            </div>

                            {/* Employee Email input */}
                            <div className="my-2">
                                <label className="text-gray-700 font-semibold mb-2">Employee Email</label>
                                <input
                                    className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal bg-blue-200 cursor-not-allowed"
                                    type="text"
                                    defaultValue={`${isOpen?.employeeEmail}`}
                                    {...register("employeeEmail", { required: true })}
                                    disabled />
                            </div>

                            {/* Employee Salary input */}
                            <div className="my-2">
                                <label className="text-gray-700 font-semibold mb-2">Employee Salary</label>
                                <input
                                    className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal bg-blue-200"
                                    type="text" id="salary" name="salary"
                                    defaultValue={`${isOpen?.employeeSalary}`}
                                    {...register("employeeSalary", { required: true })}
                                />
                            </div>

                            {/* Submit button */}
                            <div className="text-center ">
                                <button type="submit" className="border bg-purple-400 py-3 px-6 rounded-2xl text-white font-semibold text-xl hover:bg-purple-300 ">Pay</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

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

export default SalaryPay;
