import { Link } from 'react-router-dom';
import '../../../css/dropdown.css';

const DropDown = ({ label, onClick, ...rest }) => {
  return (
    <div className="drop">
      <button className="button">{label}</button>
      <div className="drop-menu">
        <Link
          {...rest}
          className="drop-item"
          onClick={() => onClick(4)}
        >
          4
        </Link>

        <Link
          {...rest}
          className=" drop-item"
          onClick={() => onClick(8)}
        >
          8
        </Link>

        <Link
          {...rest}
          className=" drop-item"
          onClick={() => onClick(20)}
        >
          20
        </Link>

        <Link
          {...rest}
          className=" drop-item"
          onClick={() => onClick(10000000)}
        >
          All
        </Link>
      </div>
    </div>
  );
};

export default DropDown;
