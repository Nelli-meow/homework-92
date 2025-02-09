import { Link } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Link to="/register" className="h4 me-2 text-decoration-none btn btn-light">Sign Up</Link>
      <Link to="/login" className="h4 text-decoration-none btn btn-dark">Sign In</Link>
    </>
  );
};

export default AnonymousMenu;