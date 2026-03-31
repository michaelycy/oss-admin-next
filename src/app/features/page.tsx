import { Container } from '@/components/feature/container';
import { Navbar } from '@/components/feature/nav-bar';
import { Upload, Zap, Globe, Shield } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      title: '快速上传',
      description: '支持拖拽上传、批量上传，多种格式自动转换，让上传变得简单高效',
      icon: <Upload className='w-8 h-8 text-blue-600' />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'CDN 加速',
      description: '全球CDN节点分布，智能路由选择，确保您的图片在世界各地都能快速加载',
      icon: <Zap className='w-8 h-8 text-green-600' />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'API 接口',
      description: 'RESTful API设计，完整的SDK支持，轻松集成到您的应用和网站中',
      icon: <Globe className='w-8 h-8 text-purple-600' />,
      bgColor: 'bg-purple-100',
    },
    {
      title: '安全存储',
      description: '企业级安全保障，多重备份机制，SSL加密传输，保护您的数据安全',
      icon: <Shield className='w-8 h-8 text-orange-600' />,
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <section className='py-20'>
        <Container>
          <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>功能特性</h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              专业的图片托管服务，让您专注于创作，我们负责技术保障
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {features.map((feature, index) => (
              <div key={index} className='bg-white p-8 rounded-2xl shadow-sm flex items-start space-x-6'>
                <div className={`shrink-0 w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-gray-900 mb-3'>{feature.title}</h2>
                  <p className='text-gray-600 leading-relaxed text-lg'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
