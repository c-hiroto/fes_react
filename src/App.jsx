import React, { useState, useEffect } from 'react';
import './App.css';
import useSWR from "swr";


const App = () => {
  //表示するブース
  const [shops, setShops] = useState([]);
  //全てのブース情報
  const [allShops, setAllShops] = useState([]);
  //選択されているカテゴリの情報
  const [selectedCategory, setSelectedCategory] = useState("ブース一覧");
  //検索のワードの情報
  const [inputValue, setInputValue] = useState("");
  //表示するブースの数
  const [loadIndex, setLoadIndex] = useState(10);
  //これ以上表示するものがないかどうか
  const [isEmpty, setIsEmpty] = useState(false);
  //ページトップへスクロールするボタンの表示
  const [pageTopButton, setPageTopButton] = useState(false);
  //スクロール量の定義
  const PAGE_Y_OFFSET_LIMIT = 100;

  const fetcher = (url) => fetch(url).then(res => res.json());
  const { data: fetchedShops, error } = useSWR('https://api.sssapi.app/vaLWfXP0I6Gmgpdp2Wbd3', fetcher);

  useEffect(() => {
    if (fetchedShops && !error) {
      setShops(fetchedShops);
      setAllShops(fetchedShops);
      }else {
        console.log(error)
      }
  }, [fetchedShops, error]);
  

  //カテゴリ名が押された時の処理
  const onClickCategory = (event) => {
    if (event.target.dataset.nav === 'ブース一覧') {
      return setShops(allShops);
    }
    const filteredShops = allShops.filter((shop) => shop.category === event.target.dataset.nav);
    setShops(filteredShops);

    // カテゴリが変わるたびにloadIndexとisEmptyとpageTopButtonを初期値に戻す
    setSelectedCategory(event.target.dataset.nav);
    setLoadIndex(10);
    setIsEmpty(false);
    setPageTopButton(false);
  };

  //入力された文字列を受け、search関数を呼び出す
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    search(event.target.value)
  }

  // 検索欄に入力された文字列をvalueで受け取り、それを用いて絞り込み
  const search = (value) => {
    // 検索欄への入力が空の場合はreturn
    if (value === "") {
      setShops(allShops);
      return;
    }

    const searchedShops = allShops.filter((shop) =>
    //各shopのObject.value(店名や紹介文などの配列)の中で、入力した文字列と一致するものがあればsearchedShopsに加える
    Object.values(shop).some((item) =>
        typeof item === "string" && item.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShops(searchedShops);
  }

  //さらに読み込むブースがあるかどうかを管理
  const displayMore = () => {
    setLoadIndex(loadIndex + 10);
    if (loadIndex >= shops.length - 10 ) {
      setIsEmpty(true);
    }
  };

  //トップへ戻るボタンの表示を切り替える
  const changePageTopButtonShow = () => {
    if (window.pageYOffset > PAGE_Y_OFFSET_LIMIT) {
      setPageTopButton(true)
    } else {
      setPageTopButton(false)
    }
  };

  //スクロールに関して管理
  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  };

  //スクロールについて監視し、ボタンの表示を管理する関数を呼び出す
  useEffect(() => {
    window.addEventListener('scroll', changePageTopButtonShow)
    return () => window.removeEventListener('scroll', changePageTopButtonShow)
  }, [])



  return (
    <>
      <h1 className="">リベ大フェス2023!!!</h1>
      <div className="search">
        <h2>キーワードから絞り込み</h2>
        <input className="input-box" value={inputValue} onChange={handleInputChange} placeholder="キーワードを入力してください"/>
      </div>

      <h3>または</h3>
      <h2>カテゴリから絞り込み</h2>

      <div className="contents">

        <div className="nav">
          <button className="nav-btn" onClick={onClickCategory} data-nav="ブース一覧">ブース一覧</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="飲食">飲食</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="物販">物販</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="貯める力">貯める力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="稼ぐ力">稼ぐ力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="増やす力">増やす力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="守る力">守る力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="使う力">使う力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="その他">その他</button>
        </div>

        <div className="shops">
          <div>{selectedCategory}</div>
          <div>全{shops.length}件</div>
          {shops.slice(0, loadIndex).map((shop) => {
            return (
              <div key={shop.id} className="shop" data-category={shop.category_num}>
                <p src="#" className="thumbnail">サムネイルがここに入ります<br></br>{shop.thumbnail_url}</p>
                <div className="shop-text">
                  <div className="booth-name">{shop.booth_name}</div>
                  <div className="category">{shop.category}</div>
                  <div className="owner-name">{shop.owner_name}</div>
                  <div className="booth-description">{shop.description}</div>
                </div>
              </div>
            )
          })}

          {shops.length < loadIndex ? <button disabled={true}>さらに表示</button> : <button disabled={isEmpty ? true : false} onClick={displayMore}>さらに表示</button>}
          
        </div>

      </div>
      {pageTopButton && (<div className="page-top" onClick={onScrollTop}><button>↑</button></div>)}
    </>
  );
}

export default App;
