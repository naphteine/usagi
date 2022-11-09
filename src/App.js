import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const entries = [
    {
      header: "garnier skin naturals hyaluronik aloe tazeleyici yüz maskesi",
      entry: "Çok güzel maske ama yüzüme tam oturmuyor. oturan var mı ki?",
      author: "gg",
      date: "2022-11-06T15:54:06+03:00",
    },
    {
      header: "claderm arındırıcı kil maskesi",
      entry: "haftada 2 kere uyguluyorum. tertemiz yapıyor. mükemmel",
      author: "gg",
      date: "2022-11-06T15:54:06+03:00",
    },
    {
      header: "herbaderm betasolution salisilik asit",
      entry:
        "Her gece iki damlayı yüzüme yedirerek uyguluyorum. inanılmaz güzel bi ürün. herkese tavsiye ederim",
      author: "gg",
      date: "2022-11-06T15:54:06+03:00",
    },
  ];

  return (
    <div className="App">
      <Header />
      <SideBar entries={entries} />
      <Main entries={entries} />
      <Footer />
    </div>
  );
}

export default App;
