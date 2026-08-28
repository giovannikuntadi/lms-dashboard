import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  width?: number;
};

export function Select({ value, onChange, options, placeholder, width }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        className={`border-border data-placeholder:text-muted-foreground border-border-default inline-flex cursor-pointer w-[${width}px] items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm outline-0`}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown size={14} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="border-border-default bg-black-default overflow-hidden rounded-md border shadow-lg">
          <SelectPrimitive.Viewport className="p-1">
            {options.map(option => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="data-highlighted:bg-muted relative flex h-8 cursor-pointer items-center rounded px-6 text-sm outline-none select-none hover:bg-blue-500"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-1 inline-flex items-center">
                  <Check size={14} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
