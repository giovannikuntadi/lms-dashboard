import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface DialogProps {
  label?: string;
  children: React.ReactNode;
  open: boolean;
  maxWidth?: string;
  onOpenChange: (open: boolean) => void;
}

export function Dialog({ label, children, open, maxWidth = 'max-w-125', onOpenChange }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {label ? (
        <DialogPrimitive.Trigger asChild>
          <button className="bg-btn-primary cursor-pointer rounded-md px-3 py-2">{label}</button>
        </DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/20 backdrop-blur-xs" />
        <DialogPrimitive.Content
          className={`bg-black-default border-border-default data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] ${maxWidth} -translate-x-1/2 -translate-y-1/2 rounded-md border p-6.25 shadow-(--shadow-6) focus:outline-none`}
        >
          {children}
          <DialogPrimitive.Close asChild>
            <button
              className="text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-violet7 absolute top-2.5 right-2.5 inline-flex size-6.25 cursor-pointer appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
