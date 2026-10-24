import { ArrowRight, Eye, EyeOff, GraduationCap, ShieldCheck, UserCog, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleDetails = {
  student: {
    icon: GraduationCap,
    title: "Student",
    description: "Report campus issues and follow progress through to resolution."
  },
  staff: {
    icon: UserCog,
    title: "Staff",
    description: "Manage assigned reports and share updates as work moves forward."
  },
  admin: {
    icon: ShieldCheck,
    title: "Administrator",
    description: "Coordinate campus reports and route work to the right people."
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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
    <main className="auth-page">
      <div className="auth-shell register-shell">
        <section className="auth-aside register-aside">
          <Link to="/" className="brand-lockup auth-brand">
            <span className="brand-mark"><Wrench size={17} /></span>
            <span>campus<span className="brand-dot">.</span>care</span>
          </Link>
          <div className="auth-aside-copy">
            <div className="landing-kicker"><span /> Make campus better, together</div>
            <h1>Every good fix begins with a clear report.</h1>
            <p>Join the campus community making it easier to raise issues and see what happens next.</p>
          </div>
          <div className="role-preview">
            <span className="role-preview-icon"><RoleIcon size={20} /></span>
            <div><span>YOUR WORKSPACE</span><strong>{selectedRole.title}</strong><p>{selectedRole.description}</p></div>
          </div>
          <div className="auth-aside-bottom">
            <span className="aside-icon"><ShieldCheck size={17} /></span>
            <span>One shared place for<br /><strong>campus issue management</strong></span>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-wrap">
            <div className="auth-mobile-brand">
              <Link to="/" className="brand-lockup"><span className="brand-mark"><Wrench size={17} /></span><span>campus<span className="brand-dot">.</span>care</span></Link>
            </div>
            <div className="form-kicker"><ShieldCheck size={15} /> GET STARTED</div>
            <h2>Create your account.</h2>
            <p className="auth-form-description">Set up your campus workspace in a few steps.</p>

            <form className="auth-form register-form" onSubmit={handleSubmit}>
              <label className="form-label">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </label>
              <label className="form-label">
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@campus.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </label>
              <label className="form-label">
                <span>Password</span>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="input-field"
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
              <label className="form-label">
                <span>Workspace role</span>
                <select name="role" value={formData.role} onChange={handleChange} className="select-field">
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <button type="submit" disabled={loading} className="button button-dark auth-submit">
                {loading ? "Creating account..." : "Create account"} {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="auth-switch">Already have an account? <Link to="/login">Sign in <ArrowRight size={14} /></Link></p>
            <p className="auth-security"><ShieldCheck size={14} /> Registration is handled by your campus workspace.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
