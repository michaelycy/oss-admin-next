import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/feature/container';

import { getServerSession } from '@/server/auth';
import Image from 'next/image';
import { NavbarBtn } from './nav-bar-btn';

export async function Navbar() {
  const session = await getServerSession();
  const isLoggedIn = !!session;

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <Container>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='w-12 h-12 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
              {/* <ImageIcon className='w-5 h-5 text-white' /> */}

              <Image src='/logo.png' alt='logo' width={128} height={128} />
            </div>
            <span className='text-xl font-bold text-gray-900'>Uno 云</span>
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
            {isLoggedIn ? (
              <Button asChild>
                <Link href='/dashboard'>进入控制台</Link>
              </Button>
            ) : (
              <>
                <Button variant='ghost' asChild>
                  <Link href='/api/auth/signin'>登录</Link>
                </Button>
                <Button asChild>
                  <Link href='/register'>免费注册</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <NavbarBtn isLoggedIn={isLoggedIn} />
        </div>
      </Container>
    </nav>
  );
}
