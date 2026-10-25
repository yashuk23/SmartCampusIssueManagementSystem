import {
  ClipboardList,
  LogOut,
  ShieldCheck,
  UserCog,
  ArrowUpRight,
  UserRound,
  Wrench,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleConfig = {
  student: { icon: ClipboardList, label: "Student" },
  admin: { icon: ShieldCheck, label: "Admin" },
  staff: { icon: UserCog, label: "Staff" }
}

const roleLabels = {
  student: "Student workspace",
  admin: "Admin workspace",
  staff: "Staff workspace"
};

const DashboardLayout = ({ title, subtitle, children }) => {
  const { user, logout } = useAuth();
  const currentRole = roleConfig[user.role];
  const Icon = currentRole.icon;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link to={`/${user.role}`} className="brand-lockup dashboard-brand">
          <span className="brand-mark"><Wrench size={17} /></span>
          <span>campus<span className="brand-dot">.</span>care</span>
        </Link>

        <div className="sidebar-section-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label={`${user.role} navigation`}>
          <NavLink to={`/${user.role}`} end className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
            <Icon size={18} />
            <span>{roleLabels[user.role]}</span>
            <ArrowUpRight className="sidebar-link-arrow" size={15} />
          </NavLink>
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-icon"><Wrench size={15} /></span>
          <p>Better campus days start with a report.</p>
          <Link to={user.role === "student" ? "/student#report-issue" : `/${user.role}`}>
            {user.role === "student" ? "Report an issue" : "View your workspace"} <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="sidebar-account">
          <div className="account-avatar" aria-hidden="true">
            {user.name?.charAt(0)?.toUpperCase() || <UserRound size={17} />}
          </div>
          <div className="account-details">
            <strong>{user.name}</strong>
            <span>Signed in</span>
          </div>
          <button type="button" className="logout-button" onClick={logout} aria-label="Log out" title="Log out">
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <time className="topbar-date">{today}</time>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-page-heading">
            <div>
              <div className="dashboard-eyebrow">{roleLabels[user.role]}</div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <div className="heading-mark" aria-hidden="true"><Icon size={22} /></div>
          </section>
          {children}
          <footer className="dashboard-footer">
            <span>Campus care, shared responsibility.</span>
            <span>Smart Campus Issue Management</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
export default DashboardLayout;
