'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/feature/container';
import { Menu, X, Image as ImageIcon } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <Container>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
              <ImageIcon className='w-5 h-5 text-white' />
            </div>
            <span className='text-xl font-bold text-gray-900'>图床云</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link href='/features' className='text-gray-600 hover:text-gray-900 transition-colors'>
              功能特性
            </Link>
            <Link href='/pricing' className='text-gray-600 hover:text-gray-900 transition-colors'>
              套餐价格
            </Link>
            <Link href='/api-docs' className='text-gray-600 hover:text-gray-900 transition-colors'>
              API文档
            </Link>
            <Link href='/about' className='text-gray-600 hover:text-gray-900 transition-colors'>
              关于我们
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className='hidden md:flex items-center space-x-4'>
            <Button variant='ghost' asChild>
              <Link href='/login'>登录</Link>
            </Button>
            <Button asChild>
              <Link href='/register'>免费注册</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100'>
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

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
                <Button variant='ghost' asChild>
                  <Link href='/login' onClick={() => setIsMenuOpen(false)}>
                    登录
                  </Link>
                </Button>
                <Button asChild>
                  <Link href='/register' onClick={() => setIsMenuOpen(false)}>
                    免费注册
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
