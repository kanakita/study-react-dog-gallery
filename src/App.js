import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Cute Dog Images</h1>
        </div>
      </div>
    </header>
  );
}

/**
 * 画像表示用のコンポーネント
 *
 * @param {Object} props
 * @param {string} props.src 画像のURL
 * @returns {JSX.Element}
 * @constructor
 */
function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={ props.src }
            alt="cute dog"
          />
        </figure>
      </div>
    </div>
  );
}

/**
 * ローディング
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Loading() {
  return (
    <p>Loading...</p>
  );
}

/**
 * 画像のコンテナー
 *
 * @param {Object} props
 * @param {string[]} props.urls 犬の画像のURLの配列
 * @returns {JSX.Element}
 * @constructor
 */
function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />
  }
  return (
    <div className="container">
      <div className="columns is-vcentered is-multiline">
        {urls.map((url, index) => {
          return (
            <div key={index} className="column is-3">
              <Image src={url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 画像切り替えフォーム
 *
 * @param {Object} props
 * @param {Function} props.onChangeBreed 選択している犬の種類変わった時の動作
 * @returns {JSX.Element}
 * @constructor
 */
function Form(props) {
  function handleChange(e) {
    props.onChangeBreed(e.target.value);
  }

  return (
    <div>
      <form>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="shiba" onChange={handleChange}>
                <option value="shiba">Shiba</option>
                <option value="akita">Akita</option>
              </select>
            </div>
          </div>
          {/*<div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>*/}
        </div>
      </form>
    </div>
  );
}

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Main() {
  const [urls, setUrls]  = useState(null);
  const [breed, setBreed] = useState("shiba");
  useEffect(() => {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadStatus(breed) {
    // 画像を変える
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });

    // 名前を変える
    setBreed(breed);
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onChangeBreed={reloadStatus} />
        </div>
      </section>
      <section className="section">
        <p className="subtitle">☆これは { breed } の画像です♪</p>
        <Gallery urls={urls} />
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
