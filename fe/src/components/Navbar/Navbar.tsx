
const Navbar: React.FC = () => {

    return (
        <nav className="flex w-screen sticky">
            <div className="w-[50%] h-12 py-5 px-8">
                <div className="w-[50%] h-12 rounded-full bg-white border border-1 border-[#D5D5D5]">
                </div>
            </div>
            <div className="w-[50%] py-5 px-8 flex gap-8">
                <div className="w-[75%] bg-white h-12 rounded-full border border-1 border-[#D5D5D5]"></div>
                <div className="w-[20%] bg-white h-12 rounded-full border border-1 border-[#D5D5D5]"></div>
            </div>
        </nav>
    );
};

export default Navbar;