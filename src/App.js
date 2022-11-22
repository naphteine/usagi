// import Header from "./components/Header";
// import SideBar from "./components/SideBar";
// import Main from "./components/Main";
// import Footer from "./components/Footer";

// function App() {
//   const entries = [
//     {
//       header: "garnier skin naturals hyaluronik aloe tazeleyici yüz maskesi",
//       entry: "Çok güzel maske ama yüzüme tam oturmuyor. oturan var mı ki?",
//       author: "gg",
//       date: "2022-11-06T15:54:06+03:00",
//     },
//     {
//       header: "claderm arındırıcı kil maskesi",
//       entry: "haftada 2 kere uyguluyorum. tertemiz yapıyor. mükemmel",
//       author: "gg",
//       date: "2022-11-06T15:54:06+03:00",
//     },
//     {
//       header: "herbaderm betasolution salisilik asit",
//       entry:
//         "Her gece iki damlayı yüzüme yedirerek uyguluyorum. inanılmaz güzel bi ürün. herkese tavsiye ederim",
//       author: "gg",
//       date: "2022-11-06T15:54:06+03:00",
//     },
//     {
//       header: "uyku hijyeni",
//       entry:
//         "Doktorumun önerilerini takiben; 1. uyumadan 2 saat önce yemek yeme/çay kahve kola içme işini bitirme 2. yine 2 saat önce mavi ışık yayan televizyon, monitör, telefonları kaldırmak, 3. uyuyamıyorsam ılık süt içmek gibi maddelerle giriştiğim olay",
//       author: "gg",
//       date: "2022-11-16T14:45:16+03:00",
//     },
//     {
//       header: "kil maskesi",
//       entry:
//         "yeşil renkte olmakla beraber yüzün üstüne sürülüp kurumaya konulur. yaklaşık 15 dakika bekleyip iyice gerginleşmeye başlayınca yıkayarak temizlenilir. en sevdiğim maske türü",
//       author: "gg",
//       date: "2022-11-16T15:02:15+03:00",
//     },
//     {
//       header: "sigara",
//       entry:
//         "yeni başlayacak olanlara tek diyebileceğim şey lütfen uzak durun. ben de kendimi kontrol ederim diğerleri gibi değilim diyerek başladım, ilk yıllarda çok az içtim fakat sonra bi sevgili işlerinde yolumu kaybedip dertten sürekli içer hale geldim. sonra da bırakamadım kesin olarak. en kötü özelliği koku falan değil, bence en kötü özelliği insanı öyle şartlarda muhtaç hale düşürebiliyor ki onurunuzu yerlere indirebiliyor",
//       author: "gg",
//       date: "2022-11-16T15:04:26+03:00",
//     },
//   ];

//   return (
//     <div className="App">
//       <div className="container">
//         <Header />

//         <div className="row">
//           <div className="col-md-3">
//             <SideBar entries={entries} />
//           </div>

//           <div className="col-md-9">
//             <Main entries={entries} />
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default App;

import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

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

    fetch(`/logout`, requestOptions)
      .catch((error) => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });

    navigate("/login");
  };

  const toggleRefresh = useCallback((status) => {
    console.log("clicked");

    if (status) {
      console.log("turning on ticking");
      let i = setInterval(() => {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        };

        fetch(`/refresh`, requestOptions)
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
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      fetch(`/refresh`, requestOptions)
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
          <h1 className="mt-3">usagisözlük</h1>
        </div>
        <div className="col text-end">
          {jwtToken === "" ? (
            <Link to="/login">
              <div>Giriş yap</div>
            </Link>
          ) : (
            <a href="#!" onClick={logOut}>
              <span className="badge bg-danger">Logout</span>
            </a>
          )}
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Anasayfa
              </Link>
              <Link
                to="/captions"
                className="list-group-item list-group-item-action"
              >
                Başlıklar
              </Link>
              <Link
                to="/genres"
                className="list-group-item list-group-item-action"
              >
                Konular
              </Link>
              {jwtToken !== "" && (
                <>
                  <Link
                    to="/post/caption/0"
                    className="list-group-item list-group-item-action"
                  >
                    Başlık Aç
                  </Link>
                  <Link
                    to="/mod/catalogue"
                    className="list-group-item list-group-item-action"
                  >
                    Konuları yönet
                  </Link>
                  <Link
                    to="/search"
                    className="list-group-item list-group-item-action"
                  >
                    Ara
                  </Link>
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
              setAlertMessage,
              setAlertClassName,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
