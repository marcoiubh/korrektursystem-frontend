import '../../../css/dropdown.css';

const DropDown = ({ label, onClick, options }) => {
  return (
    <div className="dropdown">
      <button className="button">{label}</button>
      <div className="dropdown__menu">
        {options.map((option) => (
          <p key={option} onClick={() => onClick(option)}>
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
