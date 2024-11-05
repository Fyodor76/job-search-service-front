import { ReactNode } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <nav>
        <ul>
          <li>Dashboard Home</li>
          <li>Settings</li>
          <li>Profile</li>
        </ul>
      </nav>
      <section>{children}</section>
    </div>
  );
}
