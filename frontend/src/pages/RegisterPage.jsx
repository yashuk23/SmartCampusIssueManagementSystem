import { ArrowRight, Building2, GraduationCap, UserCog } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleDetails = {
  student: {
    icon: GraduationCap,
    title: "Student access",
    description: "Report campus problems, monitor progress, and stay updated on resolution."
  },
  staff: {
    icon: UserCog,
    title: "Staff access",
    description: "Receive assigned issues, update status, and keep response work moving."
  },
  admin: {
    icon: Building2,
    title: "Admin access",
    description: "Oversee all issues and route them to the right teams with clear ownership."
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const selectedRole = useMemo(() => roleDetails[formData.role], [formData.role]);
  const RoleIcon = selectedRole.icon;

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await register(formData);
    navigate(`/${user.role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/70 bg-white/75 shadow-soft backdrop-blur xl:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#e7f3ff_54%,#eefaf7_100%)] p-8 md:p-10">
          <div className="eyebrow">Create account</div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Join the campus response network</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
            Create your profile to start reporting issues or managing campus operations with a clearer, faster workflow.
          </p>

          <div className="mt-8 rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-[22px] bg-slate-950 p-3 text-white">
                <RoleIcon size={22} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{selectedRole.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{selectedRole.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">Students and staff can sign up directly.</div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">Admin registration may still be controlled by backend rules.</div>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Set up your profile</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Use a valid campus email and choose the role that matches how you will use the system.</p>
          <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Full name</span>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
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
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input-field"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Role</span>
              <select name="role" value={formData.role} onChange={handleChange} className="select-field">
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button type="submit" disabled={loading} className="primary-btn md:col-span-2">
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
          <p className="mt-6 text-sm text-slate-500">
            Already have an account? <Link to="/login" className="font-semibold text-brand-600">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
