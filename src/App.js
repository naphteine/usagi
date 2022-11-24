import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import FeatherIcon from 'feather-icons-react';
import "./App.css";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/logout`, requestOptions)
      .catch((error) => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });

    navigate("/login");
  };

  const toggleRefresh = useCallback(
    (status) => {
      console.log("clicked");

      if (status) {
        console.log("turning on ticking");
        let i = setInterval(() => {
          const requestOptions = {
            method: "GET",
            credentials: "include",
          };

          fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => {
              console.log("user is not logged in");
            });
        }, 600000);
        setTickInterval(i);
        console.log("setting tick interval to", i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch((error) => {
          console.log("user is not logged in", error);
        });
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/" className="list-group-item list-group-item-action">
            <h1 className="mt-3">usagisözlük 🐇</h1>
          </Link>
        </div>
        <div className="col text-center mt-3">
          Hello
        </div>
        <div className="col text-end mt-3">
          {jwtToken === "" ? (
            <Link to="/login">
              <span className="btn bg-success">
                Giriş yap
                <FeatherIcon icon="log-in" />
              </span>
            </Link>
          ) : (
            <a href="#!" onClick={logOut}>
              <span className="btn bg-danger">
                <span className="pr-1">Çıkış yap</span>
                <FeatherIcon icon="log-out" />
              </span>
            </a>
          )}
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <NavLink
                to="/basliklar"
                className="list-group-item list-group-item-action"
                activeClassName="active"
              >
                Başlıklar
              </NavLink>
              <NavLink
                to="/konular"
                className="list-group-item list-group-item-action"
                activeClassName="active"
              >
                Konular
              </NavLink>
              <NavLink
                to="/graphql"
                className="list-group-item list-group-item-action"
                activeClassName="active"
              >
                Ara
              </NavLink>
              {jwtToken !== "" && (
                <>
                  <NavLink
                    to="/admin/movie/0"
                    className="list-group-item list-group-item-action"
                    activeClassName="active"
                  >
                    Başlık Aç
                  </NavLink>
                  <NavLink
                    to="/manage-catalogue"
                    className="list-group-item list-group-item-action"
                    activeClassName="active"
                  >
                    Başlıkları Düzenle
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
      <footer>
        Her hakkı saklıdır. 2022. Usagi Sözlük. PROTOTİP SÜRÜMÜDÜR LÜTFEN KİŞİSEL BİLGİ GİRMEYİNİZ.
      </footer>
    </div>
  );
}

export default App;
