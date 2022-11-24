import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Entry from "./Entry";
import EntryArea from "./EntryArea";
import TextArea from "./form/TextArea";

const Movie = () => {
  const [movie, setMovie] = useState({});
  let { id } = useParams();

  const jwtToken = "a";

  let entries = [
    {
      entry: "Mükemmel bir site",
      author: "gg",
    },
    {
      entry: "Güzel tatlı hoş şeylerin birleşimi",
      author: "kiwi",
    },
    {
      entry: "Geliştirmeye açık",
      author: "gg",
    },
    {
      entry: "Site fonksiyonları basit olsa da eğlenceli bir komünitesi var",
      author: "larapara",
    },
    {
      entry: "dil ogrenmek icin ideal!!",
      author: "erasmus",
    },
    {
      entry: "ben nedense çoğu vaktimi burada geçiriyorum artık başka sitelere giresim gelmiyor",
      author: "ayla",
    },
  ]

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
      {jwtToken != "" && <EntryArea />}
      <hr />
      {entries.map((e) => (
        <Entry
          Entry={e.entry}
          Author={e.author}
        />
      ))}
    </div>
  );
};

export default Movie;
