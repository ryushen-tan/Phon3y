import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © Phon3y {new Date().getFullYear()} — One word at a time.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link to="/transcribe" className="text-sm text-gray-500 hover:text-gray-900">
              Transcribe
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
