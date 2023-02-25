import React, { useState } from "react";
import useSWR from "swr";
import BackToTopButton from "./components/BackToTopButton";
import ShopsAndMoreButton from "./components/ShopsAndMoreButton";
import SearchBox from "./components/SearchBox";
import Nav from "./components/Nav";
import "./App.css";

const App = () => {
  //選択されているカテゴリの情報
  const [selectedCategory, setSelectedCategory] = useState("全てのブース");
  //入力されたワードの情報
  const [inputValue, setInputValue] = useState("");
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

  //カテゴリ名が押された時の処理
  const onClickCategory = (event) => {
    // カテゴリが変わるたびにinputValueとsearchWordとloadIndexを初期値に戻し、カテゴリを設定
    setSearchWord("");
    setInputValue("");
    setLoadIndex(10);
    setSelectedCategory(event.target.dataset.nav);
  };

  //入力された文字列を受け、inputValueに保存する
  const handleInputChange = (event) => {
    //入力された文字列をinputValueに保持
    setInputValue(event.target.value);
  };

  //keywordに基づき検索
  const keywordSearch = (event) => {
    event.preventDefault();
    //serachWordが変更される。useSWRのkeyが変更されるので、fetchが行われデータを取得。
    setSearchWord(inputValue);
    //カテゴリをリセットする
    setSelectedCategory("");
  };

  //さらに読み込むブースがあるかどうかを管理
  const displayMore = () => {
    //読み込めるブースの数を10追加する。
    setLoadIndex(loadIndex + 10);
    //もし、これ以上表示するブースがない場合
    if (loadIndex + 10 >= shops.length) {
      setHasNext(false);
    }
  };

  return (
    <>
      <h1 className="">リベ大フェス2023!!!</h1>

      <SearchBox
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        keywordSearch={keywordSearch}
      />

      <h3>または</h3>
      <h2>カテゴリから絞り込み</h2>

      <div className="contents">
        <Nav onClickCategory={onClickCategory} />
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
