import { Container } from '@/components/feature/container';
import { Navbar } from '@/components/feature/nav-bar';
import { Button } from '@/components/ui/button';

export default function ApiDocsPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <section className='py-20'>
        <Container>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h1 className='text-4xl font-bold text-gray-900 mb-4'>API 文档</h1>
              <p className='text-xl text-gray-600'>
                提供面向开发者的 RESTful API 接入指南、SDK 下载及使用说明
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-sm'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>快速开始</h2>

              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>1. 获取 API Key</h3>
                <p className='text-gray-600 mb-4'>
                  在您的控制台 &quot;API 密钥&quot; 页面中生成一个新的 API Key。请妥善保管该密钥。
                </p>
              </div>

              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>2. 基础接入示例 (cURL)</h3>
                <div className='bg-gray-900 rounded-lg p-4 text-gray-100 font-mono text-sm overflow-x-auto'>
                  <pre>{`curl -X POST https://api.unoCloud.com/v1/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/your/image.jpg"`}</pre>
                </div>
              </div>

              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>3. 官方 SDK</h3>
                <p className='text-gray-600 mb-4'>
                  我们提供了多种语言的官方 SDK，帮助您更快捷地集成图床服务。
                </p>
                <div className='flex gap-4'>
                  <Button variant='outline'>Node.js SDK</Button>
                  <Button variant='outline'>Python SDK</Button>
                  <Button variant='outline'>Go SDK</Button>
                </div>
              </div>

              <div className='p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-100'>
                <p className='font-medium'>完整的 API 文档正在建设中...</p>
                <p className='text-sm mt-1'>
                  包含图片上传、删除、列表查询等详细接口说明及参数定义。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
