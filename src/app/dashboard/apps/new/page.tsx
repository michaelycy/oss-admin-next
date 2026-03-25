import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getServerSession } from '@/server/auth';
import { createAppSchema } from '@/server/db/validate-schema';
import { appServerCaller } from '@/utils/trpc-server';
import { redirect } from 'next/navigation';
// import { revalidatePath } from 'next/cache';
import SubmitButton from './submit';

export default function NewApp() {
  async function createApp(params: FormData) {
    'use server';

    const name = params.get('name')!.toString();
    const description = params.get('description')!.toString();

    const input = createAppSchema.pick({ name: true, description: true }).safeParse({
      name,
      description,
    });

    if (input.success) {
      const session = await getServerSession();

      const { id: appId } = await appServerCaller(session).app.createApp(input.data);

      // revalidatePath(`/dashboard/apps/${appId}`);
      redirect(`/dashboard/apps/${appId}`);
    } else {
      throw new Error(input.error.message);
    }
  }
  return (
    <div className='h-full flex justify-center items-center'>
      <form action={createApp} className='w-full max-w-md flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-bold'>Create New App</h1>
        <Input placeholder='App Name' name='name' />
        <Textarea placeholder='App Description' name='description' />
        <SubmitButton />
      </form>
    </div>
  );
}
