import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Component/hooks/useAxiosPublic";
import Swal from "sweetalert2";

const FirstPayment = () => {
    // React Hook Form hooks for form handling
    const { register, handleSubmit, reset } = useForm();
    
    // Custom hook for making API requests
    const axiosPublic = useAxiosPublic();

    // Form submit handler
    const onSubmit = async (data) => {
        // Creating the first payment object with additional fields
        const firstPaymentInfo = {
            ...data,
            lastSalaryPaid: new Date(),
            status: "Not Paid",
        };

        try {
            // Sending the data to the API
            const payment = await axiosPublic.post(`/firstPayment`, firstPaymentInfo);

            // If the data is successfully inserted, show a success message
            if (payment.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "First Payment Added Successfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
                reset(); // Reset the form after successful submission
            }
        } catch (error) {
            console.error("Payment submission failed:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg lg:my-20">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
                    Add First Payment
                </h2>

                {/* Form starts here */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Employee Name Input */}
                    <div className="mb-4">
                        <label className="block font-semibold mt-2 mb-1">New Employee Name</label>
                        <input
                            type="text"
                            {...register("employeeName", { required: true })}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Employee Name"
                            required
                        />
                    </div>

                    {/* Employee Email Input */}
                    <div className="mb-4">
                        <label className="block font-semibold mt-2 mb-1">New Employee Email</label>
                        <input
                            type="email"
                            {...register("employeeEmail", { required: true })}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Employee Email"
                            required
                        />
                    </div>

                    {/* Employee Salary Input */}
                    <div className="mb-4">
                        <label className="block font-semibold mt-2 mb-1">New Employee Salary</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("employeeSalary", { required: true })}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Employee Salary"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="flex justify-center w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Add First Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FirstPayment;
