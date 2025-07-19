import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavbar } from "./NavbarHooks";
const Navbar: React.FC = () => {
    const { 
        userValue,
        userDesitinationUrl,
        handleUserClick,
        isSignedIn
     } = useNavbar();
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
            <div className="absolute flex w-[99.2vw] justify-between z-50">
                <div className="w-[50%] h-12 py-5 px-8">
                    <Link to="/">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="w-[35%] h-12 rounded-full bg-[#DDDDDD] border border-3 border-white flex justify-center items-center cursor-pointer hover:bg-[#FCFCFC] transition-all ease-in-out duration-500"
                        >
                            <div className="w-[95%] h-8 bg-[#FCFCFC] p-3 flex items-center rounded-2xl cursor-pointer flex justify-between">
                                <h1 className="font-bold font-poppins">Phoney</h1>
                                <img src="/logo.png" alt="Logo" className="w-6 h-6" />
                                <hr className="w-50"/>
                            </div>
                        </motion.div>
                    </Link>
                </div>
                { 
                    isSignedIn && 
                <div className="w-[50%] py-5 px-8 flex justify-end">
                    <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="w-[20%] h-12 rounded-full bg-[#DDDDDD] border border-3 border-white flex justify-center items-center cursor-pointer hover:bg-[#FCFCFC] transition-all ease-in-out duration-500"
                    >

                            <Link 
                                to={userDesitinationUrl} 
                                className="w-[90%] h-8 bg-[#FCFCFC] p-3 flex items-center justify-center rounded-2xl cursor-pointer"
                                onClick={handleUserClick}
                            >
                                <h2 
                                    className="font-poppins text-[0.7vw] text-center font-semibold text-[#2b2b2b]"
                                >
                                    {userValue}
                                </h2>
                            </Link>

                    </motion.div>
                </div>
                 }
            </div>
        </nav>
    );
};

export default Navbar;