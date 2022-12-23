import { Link } from 'react-router-dom';

const DropDown = ({ label, onClick, ...rest }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {label}
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link
            {...rest}
            className=" dropdown-item"
            onClick={() => onClick(4)}
          >
            4
          </Link>
        </li>
        <li>
          <Link
            {...rest}
            className=" dropdown-item"
            onClick={() => onClick(8)}
          >
            8
          </Link>
        </li>
        <li>
          <Link
            {...rest}
            className=" dropdown-item"
            onClick={() => onClick(20)}
          >
            20
          </Link>
        </li>
        <li>
          <Link
            {...rest}
            className=" dropdown-item"
            onClick={() => onClick(10000000)}
          >
            All
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
