import { getServerSession } from '@/server/auth';
import { db } from '@/server/db/db';
import { apps } from '@/server/db/schema';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  const userApps = await db.query.apps.findFirst({
    where: and(eq(apps.userId, session.user.id), isNull(apps.deletedAt)),
    orderBy: [desc(apps.createdAt)],
  });

  if (!userApps) {
    redirect('/dashboard/apps/new');
  } else {
    redirect(`/dashboard/apps/${userApps.id}`);
  }
}
