import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react';
import type React from 'react';

interface DropdownMenuItem {
  icon?: React.ReactNode;
  label: string;
  color?: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <MoreVertical size={14} className="cursor-pointer" />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className="border-border-default data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade bg-black-default min-w-40 rounded-md border shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] will-change-[opacity,transform]">
          {items?.map(item => (
            <DropdownMenuPrimitive.Item
              key={item.label}
              onSelect={item.onClick}
              className="group data-highlighted:bg-violet9 data-disabled:text-mauve8 data-highlighted:text-violet1 relative flex h-6 cursor-pointer flex-col justify-center rounded-[3px] px-2 py-4 text-[13px] leading-none outline-none select-none hover:bg-blue-500 data-disabled:pointer-events-none"
            >
              <div className={`flex items-center justify-baseline gap-2 px-2 py-2 text-${item.color}`}>
                {item.icon}
                {item.label}
              </div>
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
