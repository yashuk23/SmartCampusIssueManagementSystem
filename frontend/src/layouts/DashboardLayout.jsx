import { BellRing, ClipboardList, LogOut, ShieldCheck, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleConfig = {
  student: { icon: ClipboardList, label: "Student" },
  admin: { icon: ShieldCheck, label: "Admin" },
  staff: { icon: UserCog, label: "Staff" }
};

const DashboardLayout = ({ title, subtitle, children }) => {
  const { user, logout } = useAuth();
  const currentRole = roleConfig[user.role];
  const Icon = currentRole.icon;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="min-h-screen px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="glass-panel overflow-hidden px-4 py-4 md:px-5 md:py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center justify-between gap-3 sm:justify-start">
                <Link
                  to={`/${user.role}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-sm font-semibold text-brand-700"
                >
                  <BellRing size={15} />
                  Smart Campus
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="secondary-btn rounded-full px-3.5 py-2 text-sm sm:hidden"
                  aria-label="Logout"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>

              <div className="hidden h-8 w-px shrink-0 bg-slate-200/90 sm:block" aria-hidden="true" />

              <div className="flex min-w-0 items-start gap-3">
                <div className="shrink-0 rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-600 p-2.5 text-white shadow-md shadow-brand-200/60">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                      Operations workspace
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 text-[11px] font-semibold capitalize text-slate-600">
                      {currentRole.label}
                    </span>
                  </div>
                  <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950 md:text-2xl">{title}</h1>
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">{subtitle}</p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end lg:gap-3">
              <div className="flex min-w-0 max-w-full items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/75 px-3.5 py-2.5 sm:max-w-xs lg:max-w-[18rem]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-cyan-50 text-sm font-bold text-brand-700">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900" title={user.name}>
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    <span className="capitalize">{user.role}</span>
                    <span className="mx-1.5 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span>{today}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={logout}
                className="secondary-btn hidden rounded-full px-4 py-2.5 text-sm sm:inline-flex"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
