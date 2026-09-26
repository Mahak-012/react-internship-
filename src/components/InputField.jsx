function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  rightElement,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-row">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "input-error" : ""}
        />
        {rightElement}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default InputField;