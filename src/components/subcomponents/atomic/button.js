const Button = ({ label, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <button
        {...rest}
        className="btn btn-outline-primary small m-1 "
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
