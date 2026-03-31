import { Container } from '@/components/feature/container';
import { Navbar } from '@/components/feature/nav-bar';
import { Button } from '@/components/ui/button';
import { CheckCheck, X } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <section className='py-20'>
        <Container>
          <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>套餐价格</h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              从个人开发者到企业用户，我们为每个需求提供完美的解决方案
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {/* Free Plan */}
            <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow'>
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>免费版</h3>
                <div className='text-4xl font-bold text-gray-900 mb-2'>
                  ¥0
                  <span className='text-lg font-normal text-gray-600'>/月</span>
                </div>
                <p className='text-gray-600'>适合个人用户和小型项目</p>
              </div>

              <ul className='space-y-4 mb-8'>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>1GB 存储空间</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>每月 1000 次请求</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>基础 CDN 加速</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>API 访问</span>
                </li>
                <li className='flex items-center'>
                  <X className='w-5 h-5 text-gray-400 mr-3' />
                  <span className='text-gray-400'>自定义域名</span>
                </li>
              </ul>

              <Button variant='outline' className='w-full'>
                免费开始
              </Button>
            </div>

            {/* Pro Plan */}
            <div className='bg-blue-50 border-2 border-blue-500 rounded-2xl p-8 relative shadow-md hover:shadow-xl transition-shadow'>
              <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                <span className='bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium'>
                  推荐
                </span>
              </div>

              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>高级版</h3>
                <div className='text-4xl font-bold text-gray-900 mb-2'>
                  ¥99
                  <span className='text-lg font-normal text-gray-600'>/月</span>
                </div>
                <p className='text-gray-600'>适合中小企业和专业开发者</p>
              </div>

              <ul className='space-y-4 mb-8'>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>50GB 存储空间</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>每月 100,000 次请求</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>全球 CDN 加速</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>完整 API 功能</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>自定义域名</span>
                </li>
              </ul>

              <Button className='w-full'>立即升级</Button>
            </div>

            {/* Enterprise Plan */}
            <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow'>
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>企业版</h3>
                <div className='text-4xl font-bold text-gray-900 mb-2'>
                  定制
                </div>
                <p className='text-gray-600'>适合大型企业和高流量应用</p>
              </div>

              <ul className='space-y-4 mb-8'>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>1TB+ 存储空间</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>无限次请求</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>专属 CDN 节点</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>企业级 API</span>
                </li>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>24/7 专属客服</span>
                </li>
              </ul>

              <Button variant='outline' className='w-full'>
                联系销售
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
