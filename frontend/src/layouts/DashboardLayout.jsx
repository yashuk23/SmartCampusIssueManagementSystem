import { BellRing, CalendarDays, ClipboardList, LogOut, ShieldCheck, Sparkles, UserCog } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navConfig = {
  student: { icon: ClipboardList, label: "Student Dashboard", route: "/student" },
  admin: { icon: ShieldCheck, label: "Admin Dashboard", route: "/admin" },
  staff: { icon: UserCog, label: "Staff Dashboard", route: "/staff" }
};

const DashboardLayout = ({ title, subtitle, children }) => {
  const { user, logout } = useAuth();
  const currentNav = navConfig[user.role];
  const Icon = currentNav.icon;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="min-h-screen px-4 py-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="glass-panel overflow-hidden p-6 md:p-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <Link
                to={`/${user.role}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-700"
              >
                <BellRing size={16} />
                Smart Campus
              </Link>
              <div className="mt-5 flex items-start gap-4">
                <div className="rounded-[22px] bg-gradient-to-br from-brand-600 to-cyan-600 p-4 text-white shadow-lg shadow-brand-200">
                  <Icon size={26} />
                </div>
                <div>
                  <div className="eyebrow">Operations workspace</div>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">{subtitle}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 text-sm text-slate-600">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Signed in as</p>
                  <p className="mt-1 font-semibold text-slate-900">{user.name}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 text-sm text-slate-600">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Role</p>
                  <p className="mt-1 capitalize font-semibold text-slate-900">{user.role}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 text-sm text-slate-600">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Today</p>
                  <p className="mt-1 font-semibold text-slate-900">{today}</p>
                </div>
              </div>
            </div>

            <div className="flex max-w-xl flex-col gap-4 xl:items-end">
              <div className="rounded-[26px] border border-white/80 bg-slate-950 px-5 py-5 text-white shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-2.5">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Campus response hub</p>
                    <p className="text-sm text-slate-300">Designed for faster reporting, clearer ownership, and better follow-through.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <NavLink to={currentNav.route} className="secondary-btn rounded-full">
                  <CalendarDays size={16} />
                  {currentNav.label}
                </NavLink>
                <button type="button" onClick={logout} className="primary-btn rounded-full">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 soft-divider" />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
