import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import Dialog from './support-back-dialog';
import CreateApp from '@/app/dashboard/apps/new/page';

export default function InterceptingCreateApp() {
  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>Create App</DialogTitle>
        <CreateApp />
      </DialogContent>
    </Dialog>
  );
}
