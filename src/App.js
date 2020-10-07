import React, {
  useState,
  useEffect
} from "react";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState(""); //inputタグ（検索フィールド）の値が格納される。初期値は''。
  const [query, setQuery] = useState("apple"); // queryが格納される。

  //--------------------------------------------------------
  //queryが変更された時呼び出されて、APIを叩いてimagesを変更してくれる
  //--------------------------------------------------------
  useEffect(() => {
    console.log("useEffectが走りました。");
    fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
      )
      /**
       * ①responseオブジェクトが帰ってきてそのresponseのjsonを抽出
       * ②dataが帰ってくる
       * ③imagesを変更するためにsetImages。
       */
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages(data.results);
      });
  }, [query]);

  //----------------------
  //formでボタンが押されたら
  //----------------------
  const onSubmit = (e) => {
    e.preventDefault(); //再描画しない
    setQuery(text); //inputの文字を入れて
    setText(""); //初期化
    console.log("onSubmitが呼ばれました。");
  };

  return ( <
    div className = "App" >
    <
    div className = "main" >
    <
    form onSubmit = {
      onSubmit
    } >
    <
    input type = "text"
    onChange = {
      (e) => setText(e.target.value)
    } //inputの入力された値が追加
    value = {
      text
    } //初期値は空
    /> <
    button type = "submit" > Search < /button> <
    /form> <
    /div> <
    div className = "container" > {
      images.map((image) => ( <
        div key = {
          image.id
        }
        className = "card" >
        <
        img src = {
          image.urls.regular
        }
        className = "card-img"
        alt = "" / >
        <
        div className = "card-content" >
        <
        h1 className = "card-title" > {
          image.alt_description
        } < /h1> <
        /div> <
        /div>
      ))
    } <
    /div> <
    /div>
  );
};

export default App;