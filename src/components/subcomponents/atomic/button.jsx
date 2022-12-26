const Button = ({ label, ...rest }) => {
  return (
    <div className="input-group">
      <button {...rest} className="btn btn-outline-primary small">
        {label}
      </button>
    </div>
  );
};

export default Button;
