import { ArrowRight, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const featureItems = [
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description: "Students, staff, and admins each get the tools and visibility they need."
  },
  {
    icon: TimerReset,
    title: "Faster issue handling",
    description: "Move from report to assignment and resolution without losing context."
  },
  {
    icon: Sparkles,
    title: "Clear campus oversight",
    description: "Keep issue details, ownership, and status updates organized in one flow."
  }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await login(formData);
    navigate(`/${user.role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/70 shadow-soft backdrop-blur xl:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden bg-[linear-gradient(145deg,#0f172a_0%,#0f3d66_48%,#0d9488_100%)] p-8 text-white md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(186,230,253,0.2),transparent_22%)]" />
          <div className="relative">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-sky-50">
              Campus operations, streamlined
            </p>
            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight md:text-5xl">Smart Campus Issue Management System</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
              Help your campus community report problems quickly, route them to the right people, and track progress with confidence.
            </p>

            <div className="mt-10 grid gap-4">
              {featureItems.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-white/15 p-2.5">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold">{title}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-200">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8 md:p-12">
          <div className="eyebrow">Welcome back</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Sign in to your workspace</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">Use your campus account to continue managing reports, assignments, and progress updates.</p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@campus.edu"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input-field"
              />
            </label>
            <button type="submit" disabled={loading} className="primary-btn w-full">
              {loading ? "Signing in..." : "Continue to dashboard"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
          <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm text-brand-900">
            Demo accounts: admin@campus.com / Admin123!, staff@campus.com / Staff123!, student@campus.com / Student123!
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Need an account? <Link to="/register" className="font-semibold text-brand-600">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
