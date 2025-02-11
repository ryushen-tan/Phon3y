import { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className="text-grey-100 py-2">
                <div className="flex items-center justify-end h-full">
                <p>&copy; {new Date().getFullYear()} Phoney Transcribor. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;