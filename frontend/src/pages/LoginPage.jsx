import { ArrowRight, Check, Eye, EyeOff, ShieldCheck, UsersRound, Wrench } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-aside">
          <Link to="/" className="brand-lockup auth-brand">
            <span className="brand-mark"><Wrench size={17} /></span>
            <span>campus<span className="brand-dot">.</span>care</span>
          </Link>
          <div className="auth-aside-copy">
            <div className="landing-kicker"><span /> A thoughtful campus, together</div>
            <h1>Good campus care starts with being heard.</h1>
            <p>Report an issue, find the right team, and keep the whole campus moving forward.</p>
          </div>
          <div className="auth-aside-points">
            <div><span><Check size={15} /></span> Report and track campus issues</div>
            <div><span><Check size={15} /></span> Clear ownership at every step</div>
            <div><span><Check size={15} /></span> One workspace for every role</div>
          </div>
          <div className="auth-aside-bottom">
            <span className="aside-icon"><UsersRound size={17} /></span>
            <span>Students, staff, and admins<br /><strong>working better together</strong></span>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-wrap">
            <div className="auth-mobile-brand">
              <Link to="/" className="brand-lockup"><span className="brand-mark"><Wrench size={17} /></span><span>campus<span className="brand-dot">.</span>care</span></Link>
            </div>
            <div className="form-kicker"><ShieldCheck size={15} /> YOUR CAMPUS WORKSPACE</div>
            <h2>Welcome back.</h2>
            <p className="auth-form-description">Sign in with your account to continue.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
              <button type="submit" disabled={loading} className="button button-dark auth-submit">
                {loading ? "Signing in..." : "Sign in"} {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="auth-switch">New to Campus Care? <Link to="/register">Create an account <ArrowRight size={14} /></Link></p>
            <p className="auth-security"><ShieldCheck size={14} /> Your campus account keeps your workspace secure.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
