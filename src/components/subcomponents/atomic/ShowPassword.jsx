const ShowPassword = ({ state, onClick }) => {
  let classes = 'fa fa-solid fa-eye';
  if (state) classes += '-slash';

  return <i onClick={onClick} className={classes} />;
};

export default ShowPassword;
