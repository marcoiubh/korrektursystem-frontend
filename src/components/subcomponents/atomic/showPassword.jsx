const ShowPassword = ({ state, onClick }) => {
  let classes = 'fa fa-solid fa-eye';
  state ? (classes += '-slash') : void 0;

  return <i onClick={onClick} className={classes} />;
};

export default ShowPassword;
