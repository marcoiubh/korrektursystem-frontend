import '../../../css/button.css';

const Button = ({ label, ...rest }) => {
  return (
    <button
      {...rest}
      className={`button`}
    >
      {label}
    </button>
  );
};

export default Button;
