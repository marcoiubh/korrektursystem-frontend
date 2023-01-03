import '../../../css/dropdown.css';

const DropDown = ({ label, onClick, options }) => {
  return (
    <div className="dropdown">
      <button className="button">{label}</button>
      <div className="dropdown__menu">
        {options.map((option) => {
          if (typeof option == 'string') {
            label = option;
            option = Infinity;
          } else {
            label = option;
            option = option;
          }
          return (
            <p key={option} onClick={() => onClick(option)}>
              {label}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
