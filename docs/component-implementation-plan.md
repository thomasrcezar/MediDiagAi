# Component Implementation Plan

## Overview
This document outlines the plan for implementing three empty components in the MediDiagAi frontend:
1. Button.tsx
2. Header.tsx
3. Sidebar.tsx

The implementation will focus on using CSS variables defined in globals.css to ensure consistency with the design system.

## CSS Variables in globals.css
The following CSS variables are defined in globals.css:
```css
:root {
  --primary: #0070f3;
  --secondary: #1e293b;
  --accent: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --background: #ffffff;
  --text: #111827;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

## 1. Button Component

### Functionality
- Reusable button component with various variants (primary, secondary, accent, warning, danger)
- Support for different sizes (small, medium, large)
- Support for disabled state
- Support for loading state
- Support for icon buttons

### Implementation Details
```typescript
// src/components/Common/Button.tsx
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'warning' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  // Base styles using CSS variables
  const baseStyles = `
    font-family: var(--font-sans);
    font-weight: 500;
    border-radius: 0.375rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `;

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant styles using CSS variables
  const variantStyles = {
    primary: `
      background-color: var(--primary);
      color: white;
      border: 1px solid var(--primary);
      &:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--primary) 90%, black);
      }
    `,
    secondary: `
      background-color: var(--secondary);
      color: white;
      border: 1px solid var(--secondary);
      &:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--secondary) 90%, black);
      }
    `,
    accent: `
      background-color: var(--accent);
      color: white;
      border: 1px solid var(--accent);
      &:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--accent) 90%, black);
      }
    `,
    warning: `
      background-color: var(--warning);
      color: white;
      border: 1px solid var(--warning);
      &:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--warning) 90%, black);
      }
    `,
    danger: `
      background-color: var(--danger);
      color: white;
      border: 1px solid var(--danger);
      &:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--danger) 90%, black);
      }
    `,
  };

  // Combine styles
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  return (
    <button
      className={`${buttonStyles} ${className || ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          {/* Loading spinner */}
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>
  );
};
```

## 2. Header Component

### Functionality
- Display application name/logo
- Navigation links
- Responsive design
- Use CSS variables for styling

### Implementation Details
```typescript
// src/components/Layout/Header.tsx
import React from 'react';

interface HeaderProps {
  title?: string;
  logo?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'MediDiagAi',
  logo,
}) => {
  return (
    <header className="container-wrapper py-4 border-b" style={{ 
      backgroundColor: 'var(--background)',
      borderColor: 'color-mix(in srgb, var(--text) 20%, transparent)'
    }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {logo && <div>{logo}</div>}
          <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            {title}
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--primary)' }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                Patients
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                Diagnostics
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
```

## 3. Sidebar Component

### Functionality
- Navigation options
- Collapsible/responsive
- Use CSS variables for styling
- Integration with overall layout

### Implementation Details
```typescript
// src/components/Layout/Sidebar.tsx
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
```

## Integration with App

To integrate these components into the application, the App.tsx file would need to be updated to include the Header and Sidebar components. Here's a suggested implementation:

```typescript
// src/App.tsx
import React from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { ChatWindow } from './components/Chat/ChatWindow';

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
};

export default App;
```

## Next Steps

1. Switch to Code mode to implement these components
2. Test the components to ensure they render correctly
3. Verify that the CSS variables are being used properly
4. Make any necessary adjustments based on testing