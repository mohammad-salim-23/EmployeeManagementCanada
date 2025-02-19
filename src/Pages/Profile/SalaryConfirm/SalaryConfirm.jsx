import Swal from "sweetalert2";
import useAxiosPublic from "../../../Component/hooks/useAxiosPublic";
import useEmployData from "../../../Component/hooks/useEmployData";

const SalaryConfirm = () => {
    const [employData,refetch] = useEmployData();
    const axiosPublic = useAxiosPublic();

    const { _id, employeeName, employeeEmail, employeeSalary, lastSalaryPaid, status } = employData || {};

    const handleConfirm = async (employeeEmail) => {
        // console.log("পেমেন্ট কনফার্ম করা হচ্ছে...", employeeEmail);

        try {
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
                    axiosPublic.patch('/api/v1/salaryConfirm/update-status', {
                        email: employeeEmail,
                    })
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

        } catch (error) {
            console.error("আপডেট ব্যর্থ হয়েছে:", error.response || error.message);
            alert("আপডেট করতে সমস্যা হয়েছে. ত্রুটি: " + (error.response?.data?.message || error.message));
        }

    };



    // Pay Button Disable or Enable
    const isButtonDisabled = (lastSalaryPaid, status) => {
        if (status === "Pending") {
            return { disabled: false, buttonText: "Confirm", remainingDays: 0 };
        }

        const lastPaidDate = new Date(lastSalaryPaid);
        const nextEligibleDate = new Date(lastPaidDate);
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 7); // ৭ দিন যোগ করা
        const currentDate = new Date();

        const timeDiff = nextEligibleDate - currentDate;
        const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // দিন হিসাব করা

        return {
            disabled: true,
            buttonText: `Waiting ${remainingDays} Days`,
            remainingDays: remainingDays > 0 ? remainingDays : 0,
        };
    };

    const { disabled, buttonText } = isButtonDisabled(lastSalaryPaid, status);

    return (
        <div className="my-10 mb-40 overflow-x-auto">

            {/* Page Title */}
            <div className="text-center">
                <h1 className="text-3xl font-semibold my-6 text-blue-700">Employ Salary </h1>
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
                        {/* <th className="px-4 py-3 text-xl">Remaining Days</th> */}
                        <th className="px-4 py-3 text-xl">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={_id} className="border hover:bg-blue-200">
                        <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">{employeeName || "N/A"}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-gray-700">{employeeEmail || "N/A"}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-gray-700">${employeeSalary || "N/A"}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-gray-700">{lastSalaryPaid || "N/A"}</td>
                        <td
                            className={`px - 4 py-4 text-xl text-center rounded-xl border font-semibold ${status === "Not Paid"
                                ? "text-red-400 "
                                : status === "Pending"
                                    ? "text-blue-500 "
                                    : status === "Paid"
                                        ? "text-green-500   "
                                        : "text-black "
                                }`}
                        >
                            {status}
                        </td>
                        {/* <td className="whitespace-nowrap px-4 py-4 text-xl font-semibold">{remainingDays} days</td> */}
                        <td>
                            <button
                                disabled={disabled}
                                onClick={() => {
                                    if (!disabled) {
                                        handleConfirm(employeeEmail);
                                    }
                                }}
                                className={`px-4 py-2 rounded ${disabled
                                    ? "whitespace-nowrap px-4 py-4 text-xl text-center rounded-2xl p-4 cursor-not-allowed bg-gray-400 hover:bg-blue-300 text-white font-semibold"
                                    : "whitespace-nowrap px-4 py-4 text-xl text-center rounded-2xl p-4 cursor-pointer bg-green-500 hover:bg-green-400 text-white font-semibold"
                                    } text-white`}
                            >
                                {buttonText}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default SalaryConfirm;