import React, { useState } from "react";
import { BackToTopButton } from "./components/BackToTopButton";
import ShopsAndMoreButton from "./components/ShopsAndMoreButton";
import useSWR from "swr";
import "./App.css";

const App = () => {
  //選択されているカテゴリの情報
  const [selectedCategory, setSelectedCategory] = useState("全てのブース");
  //入力されたワードの情報
  let inputValue;
  //検索ワードの情報
  const [searchWord, setSearchWord] = useState("");
  //表示できるブースの最大数
  const [loadIndex, setLoadIndex] = useState(10);
  //これより表示するものがあるかどうか
  const [hasNext, setHasNext] = useState(true);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: shops, error } = useSWR(
    `${process.env.REACT_APP_FES_SHOPS}?filter__category__contains=${
      selectedCategory === "全てのブース" ? "" : selectedCategory
    }&filter__search__contains=${searchWord}`,
    fetcher,
    {
      fallbackData: [],
    },
  );

  console.log(shops);

  //カテゴリ名が押された時の処理
  const onClickCategory = (event) => {
    // カテゴリが変わるたびにInputValueとloadIndexを初期値に戻し、カテゴリを設定
    inputValue = "";
    setLoadIndex(10);
    setSelectedCategory(event.target.dataset.nav);
  };

  //入力された文字列を受け、inputValueに保存する
  const handleInputChange = (event) => {
    //入力された文字列をinputValueに保持
    inputValue = event.target.value;
  };

  //keywordに基づき検索
  const keywordSearch = (event) => {
    event.preventDefault();
    setSearchWord(inputValue);
    //カテゴリをリセットする
    setSelectedCategory("");
  };

  //さらに読み込むブースがあるかどうかを管理
  const displayMore = () => {
    setLoadIndex(loadIndex + 10);
    if (loadIndex + 10 >= shops.length) {
      //これ以上表示するブースがない場合
      setHasNext(false);
    }
  };

  return (
    <>
      <h1 className="">リベ大フェス2023!!!</h1>
      <div className="search">
        <h2>キーワードから絞り込み</h2>
        <input
          className="input-box"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="キーワードを入力してください"
        />
        <button onClick={keywordSearch}>検索</button>
      </div>

      <h3>または</h3>
      <h2>カテゴリから絞り込み</h2>

      <div className="contents">
        <div className="nav">
          <button className="nav-btn" onClick={onClickCategory} data-nav="全てのブース">
            全てのブース
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="飲食">
            飲食
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="物販">
            物販
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="貯める力">
            貯める力
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="稼ぐ力">
            稼ぐ力
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="増やす力">
            増やす力
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="守る力">
            守る力
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="使う力">
            使う力
          </button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="その他">
            その他
          </button>
        </div>

        <ShopsAndMoreButton
          shops={shops}
          selectedCategory={selectedCategory}
          loadIndex={loadIndex}
          hasNext={hasNext}
          displayMore={displayMore}
        />
      </div>
      <BackToTopButton />
    </>
  );
};

export default App;
