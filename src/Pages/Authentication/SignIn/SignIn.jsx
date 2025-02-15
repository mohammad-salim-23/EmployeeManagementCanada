import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialComponent from "../SocialComponent/SocialComponent";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import Swal from "sweetalert2";

const SignIn = () => {

    const navigate = useNavigate();

    const { signIn } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {


        signIn(data.email, data.password)
            .then(() => {
                // const user = result.user;
                // console.log(user);
                Swal.fire({
                    title: "User Login Successful.",
                    showClass: "animate__animated animate__fadeInUp animate__faster",
                    hideClass: "animate__animated animate__fadeOutDown animate__faster"
                });
            })
        navigate('/');

        reset()
    };

    // console.log( user, )


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">

                <div className="flex-1 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf')",
                        }}
                    ></div>
                </div>

                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>

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
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}

                                    <button
                                        type="submit"
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        <span className="ml-3">Sign In</span>
                                    </button>
                                </form>

                                <p className="text-center text-sm text-gray-500 mt-8">Don&#x27;t have an account yet?
                                    <Link to={'/SignUp'}
                                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                                        up
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignIn;
