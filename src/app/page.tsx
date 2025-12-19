// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UserInfo, { SessionProvider1 } from './user-info';
import { getServerSession } from '@/server/auth';

export default async function Home() {
  const session = await getServerSession();

  console.log('session', session);

  return (
    <div className='h-screen flex items-center justify-center'>
      <form className='w-full max-w-md flex flex-col gap-4'>
        <h1 className='text-3xl font-bold text-left'>Create a new account</h1>
        <Input name='email' type='email' placeholder='Enter your email' />
        <Textarea name='message' placeholder='Enter your message' />

        <Button type='submit'>Submit</Button>
      </form>

      <SessionProvider1>
        <UserInfo />
      </SessionProvider1>
    </div>
  );
}
