import '../../../css/dropdown.css';

const DropDown = ({ label, onClick, options }) => {
  return (
    <div className='dropdown'>
      {/* dropdown field */}
      <button className='button'>{label}</button>

      {/* dropdown menu */}
      <div className='dropdown__menu'>
        {options.map((option, index) => (
          // menu items
          <p
            key={index}
            onClick={() => onClick(option)}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
