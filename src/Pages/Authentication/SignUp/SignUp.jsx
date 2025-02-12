import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import useAxiosPublic from "../../../Component/hooks/useAxiosPublic";
import Swal from 'sweetalert2'
import SocialComponent from "../SocialComponent/SocialComponent";



const SignUp = () => {

    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        // confirmPassword Password Check
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", { type: "manual", message: "Passwords do not match!" });
        } else {
            console.log("Signed up with email:", data.email);
            createUser(data.email, data.password, data.name)
                .then(result => {
                    console.log(result)
                    updateUserProfile(data.name)
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                password: data.password,
                                confirmPassword: data.confirmPassword,
                                createdDate: new Date(),
                            };
                            axiosPublic.post('/users', userInfo).then(() => {
                                // if (res.data.insertedId) {

                                // }
                                Swal.fire({
                                    title: "Registration Success!",
                                    text: "You clicked the button!",
                                    icon: "success",
                                });

                                navigate('/');
                            });
                        })
                        .catch((error) => console.error(error));
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                    console.error(error);
                });

            reset(); // Reset form fields
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>

                        <div className="w-full flex-1 mt-8">
                            
                            <SocialComponent></SocialComponent>

                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up with e-mail
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Name"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="New Password"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...register("confirmPassword", { required: "Confirm Password is required" })}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword.message}</p>}

                                    <button
                                        type="submit"
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                </form>


                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by template&apos;s
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    and its
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>

                                <p className="text-center text-sm text-gray-500 mt-6">Don&#x27;t have an account yet?
                                    <Link to={'/SignIn'}
                                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                                        up
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}
                    ></div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;
