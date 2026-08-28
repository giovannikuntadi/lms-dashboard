import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';
import { Icon } from '../icons';
import { SidebarItem } from './SidebarItem';
import iconSidebarCollapsible from '@/assets/images/icon-sidebar-collapsible.svg';

const NAV_ITEMS = [
  { to: '/students', icon: Icon.SidebarStudents, label: 'Students' },
  { to: '/courses', icon: Icon.SidebarCourses, label: 'Courses' },
  { to: '/schedule', icon: Icon.SidebarSchedule, label: 'Schedule' },
  { to: '/live-sessions', icon: Icon.SidebarLiveSessions, label: 'Live Sessions' },
  { to: '/assignments', icon: Icon.SidebarAssignments, label: 'Assignments' },
  { to: '/mentors', icon: Icon.SidebarMentors, label: 'Mentors' },
  { to: '/organizations', icon: Icon.SidebarOrganizations, label: 'Organizations' },
  { to: '/settings', icon: Icon.SidebarSettings, label: 'Settings' },
];

export function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={`border-border-default sticky top-0 shrink-0 ${open ? 'w-60' : 'w-18'} flex h-screen flex-col border-r-2 transition-[width] duration-200 ease-in-out`}
    >
      <div className="flex items-center">
        <div className="my-4.5 mr-17.5 ml-6 flex items-center justify-center gap-2">
          {open ? <Icon.KodingupUncollapse /> : <Icon.KodingupCollapse />}
          {open && <span className="text-text-secondary size-3.5 font-normal">Admin</span>}
        </div>
        <div className="flex items-center">
          <Collapsible.Trigger
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            className="hover:bg-muted absolute top-6 right-5 flex h-8 w-8 translate-x-1/2 cursor-pointer items-center justify-center"
          >
            <img src={iconSidebarCollapsible} alt="Icon collapsible" className="ml-11" />
          </Collapsible.Trigger>
        </div>
      </div>
      <nav className="flex flex-col gap-3 px-5 py-6">
        {open && <div className="text-text-secondary flex-1 p-2 text-xs font-medium">MAIN MENU</div>}

        {NAV_ITEMS.map(item => (
          <SidebarItem key={item.label} to={item.to} icon={item.icon} label={item.label} isCollapse={!open} />
        ))}
      </nav>
    </Collapsible.Root>
  );
}
