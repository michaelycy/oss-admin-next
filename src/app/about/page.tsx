import { Container } from '@/components/feature/container';
import { Navbar } from '@/components/feature/nav-bar';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <section className='py-20'>
        <Container>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-16'>
              <div className='w-18 h-18 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <Image src='/logo.png' alt='logo' width={128} height={128} />
              </div>
              <h1 className='text-4xl font-bold text-gray-900 mb-4'>关于我们</h1>
              <p className='text-xl text-gray-600'>让分享更简单</p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-sm mb-12'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>我们的使命</h2>
              <div className='prose prose-blue max-w-none text-gray-600 text-lg leading-relaxed'>
                <p>
                  在这个视觉化沟通日益重要的时代，图片成为了传递信息最直观的载体。然而，如何高效、安全、低成本地存储和分发这些图片，依然是许多开发者和企业面临的挑战。
                </p>
                <p>
                  Uno
                  云的诞生正是为了解决这个问题。我们致力于为全球开发者和企业提供最稳定、最快捷的图片托管服务。通过我们强大的全球
                  CDN 网络和易用的 API，让您只需专注于业务创新和内容创作，把繁琐的技术底层交给我们。
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='bg-white rounded-2xl p-8 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>我们的价值观</h3>
                <ul className='space-y-4 text-gray-600'>
                  <li className='flex flex-col'>
                    <span className='font-semibold text-gray-900'>用户至上</span>
                    <span>始终把用户的需求和体验放在第一位。</span>
                  </li>
                  <li className='flex flex-col'>
                    <span className='font-semibold text-gray-900'>极致简单</span>
                    <span>追求产品设计的极简主义，降低使用门槛。</span>
                  </li>
                  <li className='flex flex-col'>
                    <span className='font-semibold text-gray-900'>可靠安全</span>
                    <span>把数据安全视为生命线，提供企业级保障。</span>
                  </li>
                </ul>
              </div>

              <div className='bg-blue-600 rounded-2xl p-8 shadow-sm text-white flex flex-col justify-center items-center text-center'>
                <h3 className='text-2xl font-bold mb-4'>加入我们</h3>
                <p className='mb-6 text-blue-100'>
                  我们正在寻找志同道合的伙伴，一起打造下一代的基础设施服务。
                </p>
                <a
                  href='mailto:jobs@unocloud.com'
                  className='bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors'>
                  查看职位
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
