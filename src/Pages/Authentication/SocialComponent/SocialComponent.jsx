import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Component/hooks/useAxiosPublic";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";


const SocialComponent = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { singWithGoogle } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        singWithGoogle()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    createdDate: new Date(),
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        // console.log(res.data);
                        Swal.fire({
                            title: "Google LogIn Success!",
                            text: "You clicked the button!",
                            icon: "success"
                        });

                        navigate('/')
                        navigate('/');
                    })
            })

    }
    return (
        <div className="flex flex-col items-center">
            <button onClick={handleGoogleSignIn} className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <div className="bg-white p-2 rounded-full">
                    <FcGoogle className="text-2xl" />
                </div>
                <span className="ml-4">Sign Up with Google</span>
            </button>


        </div>
    );
};

export default SocialComponent;