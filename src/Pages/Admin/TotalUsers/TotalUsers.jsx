import { TiDeleteOutline } from "react-icons/ti";
import useAllUsers from "../../../Component/hooks/useAllUsers";
import useAxiosPublic from "../../../Component/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";

const TotalUsers = () => {

    const [allUsers, refetch, isLoading] = useAllUsers();
    const axiosSecure = useAxiosPublic();


    // {/* Make Admin/Employee/Reseller/Customer */}
    const handleTypeChange = (user, newType) => {
        const userDetails = {
            ...user,
            role: newType,
        };
        axiosSecure.patch(`/users/${user._id}`, userDetails)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    // Show SweetAlert success modal after the update is successful
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "User Type Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to update Customer type.",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to update Customer type.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            });
    };



    // Delete User Data in Dashboard
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure you want to delete this user?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
        refetch();
    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Change the number of items per page as needed


    // Pagination calculations
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = allUsers.slice(startIndex, startIndex + itemsPerPage);

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

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


    //  Loading
    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                    </div>
                </div>
            </div>
        );
    }





    return (
        <div>

            <div className="text-center">
                <h1 className="text-3xl font-semibold my-6">Total Users: {allUsers.length}</h1>
            </div>


            <div className="overflow-x-auto mx-auto container">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead>
                        <tr className="text-left ">
                            <th className="px-4 py-3 text-xl">Name</th>
                            <th className="px-4 py-3 text-xl">Email</th>
                            <th className="px-4 py-3 text-xl">Type</th>
                            <th className="px-4 py-3 text-xl">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user._id} className="border hover:bg-blue-200">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>

                                {/* Make Admin/Employee/Reseller/Customer */}
                                <select
                                    value={user.type}
                                    onChange={(e) => handleTypeChange(user, e.target.value)}
                                    defaultValue={user.role}
                                    className="border py-2 my-1 cursor-pointer"
                                >
                                    <option className="cursor-pointer" value="customer">Customer</option>
                                    <option className="cursor-pointer" value="reseller">Reseller</option>
                                    <option className="cursor-pointer" value="employee">Employee</option>
                                    <option className="cursor-pointer" value="admin">Admin </option>
                                </select>

                                <td>
                                    <TiDeleteOutline
                                        className="text-4xl cursor-pointer ml-4 hover:bg-red-600 rounded-full text-center"
                                        onClick={() => handleDelete(user._id)}
                                    />
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Pagination Start*/}
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

            {/* Pagination End*/}
        </div >
    );
};

export default TotalUsers;