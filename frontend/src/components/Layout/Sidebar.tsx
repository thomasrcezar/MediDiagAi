import React, { useState } from 'react';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href: string;
}

interface SidebarProps {
  items?: SidebarItem[];
  defaultCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items = [],
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // Default sidebar items if none provided
  const defaultItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/' },
    { id: 'patients', label: 'Patients', href: '/patients' },
    { id: 'diagnostics', label: 'Diagnostics', href: '/diagnostics' },
    { id: 'chat', label: 'AI Chat', href: '/chat' },
    { id: 'reports', label: 'Reports', href: '/reports' },
    { id: 'settings', label: 'Settings', href: '/settings' },
  ];

  const sidebarItems = items.length > 0 ? items : defaultItems;

  return (
    <aside
      className={`h-screen transition-all duration-300 border-r ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'color-mix(in srgb, var(--text) 20%, transparent)'
      }}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && (
          <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>
            Menu
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                style={{ color: 'var(--text)' }}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};