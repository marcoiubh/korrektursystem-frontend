const ShowPassword = ({ state, onClick }) => {
  // hide password
  let classes = 'fa fa-solid fa-eye';

  // show password
  if (state) classes += '-slash';

  return (
    <i
      onClick={onClick}
      className={classes}
    />
  );
};

export default ShowPassword;
