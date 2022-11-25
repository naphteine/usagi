import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Entry from "./Entry";
import EntryArea from "./EntryArea";
import TextArea from "./form/TextArea";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const [entry, setEntry] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  let { id } = useParams();

  const jwtToken = "a";

  const onChange = (event) => {
    setNewEntry(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newEntry.length <= 0) {
      Swal.fire({
        title: 'Boş girdi gönderemezsiniz!',
        text: "",
        icon: 'error',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Geri dön'
      })
    } else {
      console.log(newEntry);
    }
  }

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`${process.env.REACT_APP_BACKEND}/movies/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${process.env.REACT_APP_BACKEND}/entries/captions/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setEntry(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (movie.genres) {
    movie.genres = Object.values(movie.genres);
  } else {
    movie.genres = [];
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <br />
      {movie.genres.map((g) => (
        <span key={g.genre} className="badge bg-secondary me-2">
          {g.genre}
        </span>
      ))}
      {jwtToken != "" &&
        <form onSubmit={handleSubmit}>
          <EntryArea onChange={onChange} />
        </form>
      }
      <hr />
      {entry.map((e) => (
        <Entry
          Entry={e.entry}
          Author={e.author}
        />
      ))}
    </div>
  );
};

export default Movie;
