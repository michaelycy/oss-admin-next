import { authOptions } from '@/lib/auth';
import { getServerSession as nextAuthGetServerSession } from 'next-auth';

export const getServerSession = () => nextAuthGetServerSession(authOptions);
