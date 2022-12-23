import { Link } from 'react-router-dom';
const PageButton = ({ page, currentPage, onClick, ...rest }) => {
  return (
    <li
      className={
        page === currentPage ? 'page-item active' : 'page-item'
      }
    >
      {
        <Link
          {...rest}
          className="page-link"
          onClick={() => onClick(page)}
        >
          {page}
        </Link>
      }
    </li>
  );
};

export default PageButton;
