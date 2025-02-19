import { useContext } from "react";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";

const MyProfile = () => {

    
        const { user } = useContext(AuthContext)

    return (
        <div>
            <div className="px-2 py-4 flex flex-col justify-center items-center text-center ">
                <div className=" mt-40 mb-28 lg:mt-24 lg:mb-96 border border-blue-400 p-8 rounded-2xl">

                    <img src={user?.photoURL} className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 text-indigo-600 h-32 w-32  " alt={user.displayName} />
                    <h1 className="text-2xl text-gray-500 font-bold mt-6">
                        {user.displayName}
                    </h1>
                    <h2 className="text-base md:text-xl text-gray-500 font-bold mt-2">
                        {user.email}
                    </h2>
 
                </div>
            </div>
        </div>
    );
};

export default MyProfile;