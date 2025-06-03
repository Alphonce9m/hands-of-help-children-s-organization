'use client';

import { FC, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { ShareOptions } from '@/types/share';
import { cn } from '@/lib/utils';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  hashtags: string;
}

const ShareDialog: FC<ShareDialogProps> = ({ isOpen, onClose, message, hashtags }) => {
  const [selectedOption, setSelectedOption] = useState<ShareOptions>('copy');

  const handleShare = () => {
    if (selectedOption === 'copy') {
      navigator.clipboard.writeText(message);
      alert('Message copied to clipboard!');
    } else if (selectedOption === 'whatsapp') {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}%20${encodeURIComponent(hashtags)}`,
        '_blank'
      );
    } else if (selectedOption === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}%20${encodeURIComponent(hashtags)}`,
        '_blank'
      );
    }
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[425px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-background p-6 shadow-lg duration-200 focus:outline-none">
          <Dialog.Title className="text-lg font-semibold">Share Your Impact</Dialog.Title>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">Share your donation story:</p>
              <div className="h-[100px] rounded-md border bg-background/50 p-4">
                <p className="text-sm text-muted-foreground">{message}</p>
                <p className="text-sm text-muted-foreground">{hashtags}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className={cn(
                  'w-full justify-center border rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  selectedOption === 'copy' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted'
                )}
                onClick={() => setSelectedOption('copy')}
                variant="default"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
              <Button
                className={cn(
                  'w-full justify-center border rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  selectedOption === 'whatsapp' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted'
                )}
                onClick={() => setSelectedOption('whatsapp')}
                variant="default"
              >
                <Share2 className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                className={cn(
                  'w-full justify-center border rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  selectedOption === 'twitter' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted'
                )}
                onClick={() => setSelectedOption('twitter')}
                variant="default"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleShare}>Share</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShareDialog;
