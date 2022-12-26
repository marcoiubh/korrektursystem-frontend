import '../../../css/button.css';

const PageButton = ({ page, currentPage, onClick, ...rest }) => {
  return (
    <button
      {...rest}
      className={
        page === currentPage
          ? 'pagebutton pagebutton_active'
          : 'pagebutton'
      }
      onClick={() => onClick(page)}
    >
      {page}
    </button>
  );
};

export default PageButton;
