import { Container } from '@/components/feature/container';
import { Navbar } from '@/components/feature/nav-bar';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Globe,
  Shield,
  Upload,
  CheckCheck,
  Quote,
  Star,
  Github,
  Twitter,
  Mail,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <section className='relative bg-linear-to-r from-blue-600 to-purple-600 text-white py-20 lg:py-32'>
        <div className='absolute inset-0 bg-black/10'></div>
        <Container className='relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
              专业的云端图片存储
              <br />
              <span className='text-blue-200'>让分享更简单</span>
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed'>
              为个人用户、开发者和企业提供高效、安全、稳定的图片托管服务
              <br />
              支持CDN加速，让您的图片秒速加载
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                size='lg'
                variant='secondary'
                className='bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold'
                asChild>
                <Link href='/register'>
                  免费开始使用
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </Button>
              <Button size='lg' asChild>
                <Link href='/demo'>查看演示</Link>
              </Button>
            </div>
            <div className='mt-12 text-blue-200'>
              <p className='text-sm'>
                已有 <span className='font-semibold text-white'>10,000+</span> 用户信赖我们的服务
              </p>
            </div>
          </div>
        </Container>

        {/* Decorative Elements */}
        <div className='absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl'></div>
        <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg'></div>
      </section>

      {/* Quick Stats */}
      <section className='py-12 bg-white border-b border-gray-200'>
        <Container>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-3xl font-bold text-blue-600 mb-2'>99.9%</div>
              <div className='text-gray-600'>服务可用性</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-blue-600 mb-2'>10TB+</div>
              <div className='text-gray-600'>存储容量</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-blue-600 mb-2'>100ms</div>
              <div className='text-gray-600'>平均响应时间</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-blue-600 mb-2'>24/7</div>
              <div className='text-gray-600'>技术支持</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gray-50'>
        <Container>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>为什么选择我们？</h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              专业的图片托管服务，让您专注于创作，我们负责技术保障
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Feature 1: Fast Upload */}
            <div className='text-center group'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors'>
                <Upload className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>快速上传</h3>
              <p className='text-gray-600 leading-relaxed'>
                支持拖拽上传、批量上传，多种格式自动转换，让上传变得简单高效
              </p>
            </div>

            {/* Feature 2: CDN Acceleration */}
            <div className='text-center group'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors'>
                <Zap className='w-8 h-8 text-green-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>CDN 加速</h3>
              <p className='text-gray-600 leading-relaxed'>
                全球CDN节点分布，智能路由选择，确保您的图片在世界各地都能快速加载
              </p>
            </div>

            {/* Feature 3: API Interface */}
            <div className='text-center group'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors'>
                <Globe className='w-8 h-8 text-purple-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>API 接口</h3>
              <p className='text-gray-600 leading-relaxed'>
                RESTful API设计，完整的SDK支持，轻松集成到您的应用和网站中
              </p>
            </div>

            {/* Feature 4: Secure Storage */}
            <div className='text-center group'>
              <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors'>
                <Shield className='w-8 h-8 text-orange-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>安全存储</h3>
              <p className='text-gray-600 leading-relaxed'>
                企业级安全保障，多重备份机制，SSL加密传输，保护您的数据安全
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className='py-20 bg-white'>
        <Container>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>选择适合您的套餐</h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              从个人开发者到企业用户，我们为每个需求提供完美的解决方案
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {/* Free Plan */}
            <div className='bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow'>
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
                <li className='flex items-center'>
                  <X className='w-5 h-5 text-gray-400 mr-3' />
                  <span className='text-gray-400'>优先技术支持</span>
                </li>
              </ul>

              <Button variant='outline' className='w-full'>
                免费开始
              </Button>
            </div>

            {/* Pro Plan */}
            <div className='bg-blue-50 border-2 border-blue-500 rounded-2xl p-8 relative hover:shadow-lg transition-shadow'>
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
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>邮件技术支持</span>
                </li>
              </ul>

              <Button className='w-full'>立即升级</Button>
            </div>

            {/* Enterprise Plan */}
            <div className='bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow'>
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>企业版</h3>
                <div className='text-4xl font-bold text-gray-900 mb-2'>
                  ¥999
                  <span className='text-lg font-normal text-gray-600'>/月</span>
                </div>
                <p className='text-gray-600'>适合大型企业和高流量应用</p>
              </div>

              <ul className='space-y-4 mb-8'>
                <li className='flex items-center'>
                  <CheckCheck className='w-5 h-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>1TB 存储空间</span>
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
                  <span className='text-gray-700'>多域名支持</span>
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

      {/* Testimonials Section */}
      <section className='py-20 bg-gray-50'>
        <Container>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>用户怎么说</h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              来自全球开发者和企业的真实反馈
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Testimonial 1 */}
            <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex items-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 text-yellow-400 fill-current' />
                ))}
              </div>
              <Quote className='w-8 h-8 text-gray-300 mb-4' />
              <p className='text-gray-700 mb-6 leading-relaxed'>
                &quot;作为一名独立开发者，这个图床服务完全满足了我的需求。上传速度快，API简单易用，而且免费版就足够我的小项目使用了。&quot;
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
                  <span className='text-blue-600 font-semibold'>张</span>
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>张小明</div>
                  <div className='text-gray-600 text-sm'>前端开发工程师</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex items-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 text-yellow-400 fill-current' />
                ))}
              </div>
              <Quote className='w-8 h-8 text-gray-300 mb-4' />
              <p className='text-gray-700 mb-6 leading-relaxed'>
                &quot;我们公司的产品需要处理大量图片，这个服务的CDN加速效果非常好，全球用户访问都很快。技术支持也很及时。&quot;
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4'>
                  <span className='text-green-600 font-semibold'>李</span>
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>李经理</div>
                  <div className='text-gray-600 text-sm'>产品经理</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex items-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 text-yellow-400 fill-current' />
                ))}
              </div>
              <Quote className='w-8 h-8 text-gray-300 mb-4' />
              <p className='text-gray-700 mb-6 leading-relaxed'>
                &quot;安全性和稳定性都很出色，我们的电商平台已经使用了一年多，从来没有出现过问题。价格也很合理。&quot;
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4'>
                  <span className='text-purple-600 font-semibold'>王</span>
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>王总</div>
                  <div className='text-gray-600 text-sm'>技术总监</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-blue-600'>
        <Container>
          <div className='text-center text-white'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>准备开始了吗？</h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              立即注册，享受免费额度，体验专业的图片托管服务
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                variant='secondary'
                className='bg-white text-blue-600 hover:bg-gray-100'>
                免费开始
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
              <Button size='lg'>查看文档</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-16'>
        <Container>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='md:col-span-1'>
              <div className='flex items-center mb-4'>
                <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3'>
                  <Upload className='w-5 h-5 text-white' />
                </div>
                <span className='text-xl font-bold'>ImageHost</span>
              </div>
              <p className='text-gray-400 mb-6 leading-relaxed'>
                专业的图片托管服务，为开发者和企业提供可靠、快速、安全的图片存储解决方案。
              </p>
              <div className='flex space-x-4'>
                <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                  <Github className='w-5 h-5' />
                </a>
                <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                  <Twitter className='w-5 h-5' />
                </a>
                <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                  <Mail className='w-5 h-5' />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>产品</h3>
              <ul className='space-y-3'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    功能特性
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    套餐价格
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    API 文档
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    SDK 下载
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>支持</h3>
              <ul className='space-y-3'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    帮助中心
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    联系我们
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    状态页面
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    社区论坛
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>公司</h3>
              <ul className='space-y-3'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    关于我们
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    博客
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    招聘
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    隐私政策
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>© 2025 ImageHost. 保留所有权利。</p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <a href='#' className='text-gray-400 hover:text-white text-sm transition-colors'>
                服务条款
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm transition-colors'>
                隐私政策
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm transition-colors'>
                Cookie 政策
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
