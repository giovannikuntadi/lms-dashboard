import { Icon } from '@/components/icons';

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, placeholder, onChange }: SearchInputProps) {
  return (
    <span className="border-border-default flex items-center gap-1.5 rounded-md border px-3 py-2">
      <Icon.Search />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-56 outline-none"
      />
    </span>
  );
}
