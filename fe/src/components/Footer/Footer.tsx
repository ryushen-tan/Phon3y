import { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className="text-[#5F5F5F] py-2">
                <div className="flex items-center justify-end h-full">
                <p>&copy; {new Date().getFullYear()} Phoney Transcribor. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;