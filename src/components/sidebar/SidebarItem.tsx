import type { ComponentType } from 'react';
import { NavLink, useMatch } from 'react-router';

type IconProps = { stroke?: string };

interface SidebarItemProps {
  to: string;
  icon: ComponentType<IconProps>;
  label: string;
  isCollapse: boolean;
}

export function SidebarItem({ to, icon: Icon, label, isCollapse }: SidebarItemProps) {
  const match = useMatch(to);
  const isActive = Boolean(match);

  return (
    <NavLink
      to={to}
      className={`group flex items-center gap-2 rounded-lg p-2 ${isActive ? 'text-btn-primary bg-[#18181B]' : ''}`}
    >
      <span>
        <Icon stroke={isActive ? '#155DFC' : undefined} />
      </span>

      {!isCollapse && <span className="color-white text-sm">{label}</span>}
    </NavLink>
  );
}
