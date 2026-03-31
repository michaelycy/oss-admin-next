'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NavbarBtnProps {
  isLoggedIn?: boolean;
}

export function NavbarBtn({ isLoggedIn }: NavbarBtnProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className='md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100'>
        {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden py-4 border-t border-gray-200'>
          <div className='flex flex-col space-y-4'>
            <Link
              href='/features'
              className='text-gray-600 hover:text-gray-900 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              功能特性
            </Link>
            <Link
              href='/pricing'
              className='text-gray-600 hover:text-gray-900 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              套餐价格
            </Link>
            <Link
              href='/api-docs'
              className='text-gray-600 hover:text-gray-900 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              API文档
            </Link>
            <Link
              href='/about'
              className='text-gray-600 hover:text-gray-900 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              关于我们
            </Link>
            <div className='flex flex-col space-y-2 pt-4 border-t border-gray-200'>
              {isLoggedIn ? (
                <Button asChild>
                  <Link href='/dashboard' onClick={() => setIsMenuOpen(false)}>
                    进入控制台
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant='ghost' asChild>
                    <Link href='/api/auth/signin' onClick={() => setIsMenuOpen(false)}>
                      登录
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href='/register' onClick={() => setIsMenuOpen(false)}>
                      免费注册
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
