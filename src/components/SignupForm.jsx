import { useState } from "react";
import InputField from "./InputField";
import "./SignupForm.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    city: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email (e.g. name@mail.com).";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!formData.city) {
      newErrors.city = "Please select a city.";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the Terms & Conditions.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  // Success screen
  if (submitted) {
    return (
      <div className="signup-page">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Account Created Successfully!</h2>
          <p>
            Welcome, <strong>{formData.fullName}</strong>!
          </p>
          <p className="success-sub">
            A confirmation email was sent to {formData.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* Left Brand Panel */}
        <aside className="brand-panel">
          <div className="brand-logo">M</div>
          <h2>Join us today!</h2>
          <p>Create your account in less than a minute.</p>
          <ul className="brand-points">
            <li>✦ Free forever</li>
            <li>✦ No credit card required</li>
            <li>✦ Works on every device</li>
          </ul>
        </aside>

        {/* Right Form Side */}
        <div className="form-side">
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <h1>Create Account</h1>
            <p className="form-subtitle">Fill in your details to get started</p>

            <InputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="e.g. Mahak Khan"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="e.g. mahak@mail.com"
            />

            <InputField
              label="Password"
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              error={errors.password}
              placeholder="At least 6 characters"
              rightElement={
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              }
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Re-enter your password"
              rightElement={
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              }
            />

            {/* Gender - Pill Radio Buttons */}
            <div className="form-group">
              <label>Gender</label>
              <div className="pill-group">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className={`pill ${formData.gender === g ? "pill-active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
            </div>

            {/* Dropdown */}
            <div className="form-group">
              <label htmlFor="city">Country / City</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "input-error" : ""}
              >
                <option value="">-- Select your city --</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Quetta">Quetta</option>
              </select>
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>

            {/* Terms - Custom Checkbox */}
            <div className="form-group">
              <label className={`checkbox-card ${formData.terms ? "checkbox-active" : ""}`}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <span className="checkbox-box">{formData.terms ? "✓" : ""}</span>
                <span>
                  I agree to the <span className="terms-link">Terms &amp; Conditions</span>
                </span>
              </label>
              {errors.terms && <p className="error-text">{errors.terms}</p>}
            </div>

            <button type="submit" className="submit-btn">
              Create Account →
            </button>

            <p className="login-text">
              Already have an account? <span className="terms-link">Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;