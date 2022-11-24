import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const OneGenre = () => {
  // get prop passed to this component
  const location = useLocation();
  const { genreName } = location.state;

  // set stateful variables
  const [movies, setMovies] = useState([]);

  // get id from url
  let { id } = useParams();

  // useEffect to get list of movies
  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/movies/genres/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.message);
        } else {
          setMovies(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // return jsx
  return (
    <>
      <h2>Konu: {genreName}</h2>
      <hr />

      {movies.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Release Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td>
                  <Link to={`/baslik/${m.id}`}>{m.title}</Link>
                </td>
                <td>{m.release_date}</td>
                <td>{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Bu konuda bir başlık bulunamadı!</p>
      )}
    </>
  );
};

export default OneGenre;
