import { useLocation } from 'react-router';

export type SegmentedControlItem = {
  value: number;
  label: string;
  to: string;
};

interface SegmentedControlItems {
  items: SegmentedControlItem[];
  onClick: (item: SegmentedControlItem) => void;
}

export function SegmentedControl({ items, onClick }: SegmentedControlItems) {
  const location = useLocation();

  return (
    <div className="border-border-default mb-10 flex items-center gap-8 border-b py-2.5">
      {items.map(item => (
        <div
          key={item.value}
          className={`cursor-pointer text-sm font-medium ${location.pathname === item.to ? 'border-b border-blue-500 text-blue-500' : 'text-text-secondary'}`}
          onClick={() => onClick(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
