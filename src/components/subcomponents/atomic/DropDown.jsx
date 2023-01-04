import '../../../css/dropdown.css';

const DropDown = ({ label, onClick, options }) => {
  return (
    <div className="dropdown">
      <button className="button">{label}</button>
      <div className="dropdown__menu">
        {options.map((option, index) => (
          <p key={index} onClick={() => onClick(option)}>
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
