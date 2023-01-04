import '../../../css/button.css';

const PageButton = ({ page, currentPage, onClick, ...rest }) => {
  return (
    <button
      {...rest}
      className={
        page === currentPage ? 'button button--active' : 'button'
      }
      onClick={() => onClick(page)}
    >
      {page}
    </button>
  );
};

export default PageButton;
