import '../../../css/button.css';

const Button = ({ label, color, ...rest }) => {
  return (
    <button {...rest} className={`button ${color}`}>
      {label}
    </button>
  );
};

export default Button;
