import { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className="text-[#5F5F5F] py-2 bg-[#DAE2FA] border-t border-white">
                <div className="flex items-center justify-center h-full">
                <p>&copy; {new Date().getFullYear()} "One word at a time."</p>
            </div>
        </footer>
    );
};

export default Footer;