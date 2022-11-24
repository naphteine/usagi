import { Link } from "react-router-dom";
import Ticket from "./../images/rabbit.jpg";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h2>Güzellik tatlılık hoş şeyler</h2>
        <hr />
        <Link to="/movies">
          <img src={Ticket} alt="movie tickets"></img>
        </Link>
      </div>
    </>
  );
};

export default Home;
