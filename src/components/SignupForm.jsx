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

  // Event Handling: 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Form Validation
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

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true); 
    }
  };

  
  if (submitted) {
    return (
      <div className="signup-container">
        <div className="success-card">
          <h2>✅ Account Created Successfully!</h2>
          <p>Welcome, {formData.fullName}!</p>
          <p className="success-sub">
            A confirmation email was sent to {formData.email}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h1>Create Account</h1>

        {/* Full Name */}
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="e.g. Mahak"
        />

        {/* Email */}
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="e.g. mahak@mail.com"
        />

        {/* Password */}
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
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />

        {/* Confirm Password */}
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
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          }
        />

        {/* Gender - Radio Buttons */}
        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="radio-label">
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

        {/* Dropdown - Select / Option */}
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

        {/* Terms & Conditions Checkbox */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I agree to the Terms &amp; Conditions
          </label>
          {errors.terms && <p className="error-text">{errors.terms}</p>}
        </div>

        {/* Create Account Button */}
        <button type="submit" className="submit-btn">
          Create Account
        </button>

        <p className="login-text">
          Already have an account? <a href="#">Login</a>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;