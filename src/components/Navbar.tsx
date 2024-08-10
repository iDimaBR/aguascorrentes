// src/components/Navbar.tsx
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-[#0088cc] shadow-md w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={78} height={50} />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/checkout">
              <div className="relative flex items-center cursor-pointer text-white">
                <ShoppingCartIcon className="h-8 w-8 text-white" />
              </div>
            </Link>

            <Link href="/login">
              <div className="flex items-center cursor-pointer text-white">
                <UserIcon className="h-8 w-8" />
                <span className="ml-2 text-sm font-medium">Olá, faça seu login</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
