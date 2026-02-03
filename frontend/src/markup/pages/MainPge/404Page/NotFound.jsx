import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for does not exist.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};
export default NotFound;