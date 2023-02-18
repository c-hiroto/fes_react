import React, { useState } from "react";
import { BackToTopButton } from "./components/BackToTopButton";
import useSWR from "swr";
import "./App.css";

const App = () => {
  //選択されているカテゴリの情報
  const [selectedCategory, setSelectedCategory] = useState("全てのブース");
  //検索のワードの情報
  const [inputValue, setInputValue] = useState("");
  //表示できるブースの最大数
  const [loadIndex, setLoadIndex] = useState(10);
  //これより表示するものがあるかどうか
  const [hasNext, setHasNext] = useState(true);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: shops, error } = useSWR(
    `https://api.sssapi.app/vaLWfXP0I6Gmgpdp2Wbd3?filter__category__contains=${
      selectedCategory === "全てのブース" ? "" : selectedCategory
    }&filter__description__contains=${inputValue}`,
    fetcher,
    { fallbackData: [] },
  );

  //カテゴリ名が押された時の処理
  const onClickCategory = (event) => {
    // カテゴリが変わるたびにInputValuとloadIndexを初期値に戻し、カテゴリを設定
    setInputValue("");
    setLoadIndex(10);
    setSelectedCategory(event.target.dataset.nav);
  };

  //入力された文字列を受け、search関数を呼び出す
  const handleInputChange = (event) => {
    //入力された文字列をinputValueに保持
    setInputValue(event.target.value);
    //カテゴリをnullにすることで、カテゴリの表示を無くす
    setSelectedCategory(null);
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

        <div className="shops">
          <div>{selectedCategory}</div>
          <div>全{shops.length}件</div>
          {shops.slice(0, loadIndex).map((shop) => {
            return (
              <div key={shop.id} className="shop" data-category={shop.category_num}>
                <p src="#" className="thumbnail">
                  サムネイルがここに入ります<br></br>
                  {shop.thumbnail_url}
                </p>
                <div className="shop-text">
                  <div className="booth-name">{shop.booth_name}</div>
                  <div className="category">{shop.category}</div>
                  <div className="owner-name">{shop.owner_name}</div>
                  <div className="booth-description">{shop.description}</div>
                </div>
              </div>
            );
          })}

          {shops.length < loadIndex ? (
            <button disabled={true}>さらに表示</button>
          ) : (
            <button disabled={!hasNext} onClick={displayMore}>
              さらに表示
            </button>
          )}
        </div>
      </div>
      <BackToTopButton />
    </>
  );
};

export default App;
