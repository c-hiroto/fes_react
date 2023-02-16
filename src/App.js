import './App.css';
import { useState, useEffect } from 'react';



const App = () => {
  const [shops, setShops] = useState([]);
  const [allShops, setAllShops] = useState([]);

  useEffect(() => {
      fetch('https://api.sssapi.app/vaLWfXP0I6Gmgpdp2Wbd3', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
          setShops(data);
          setAllShops(data);
      })
      .catch(error =>{
        console.error(error);
      })
  }, [])

  const onClickCategory = (event) => {
    event.preventDefault();
    if (event.target.dataset.nav === '0') {
      return setShops(allShops);
    }
    const filteredShops = allShops.filter((shop) => shop.category_num === event.target.dataset.nav);
    setShops(filteredShops);
  };

  return (
    <>
      <h1 className="">🎇リベ大フェス2023🎉</h1>

      <div className="contents">

        <div className="nav">
          <button className="nav-btn" onClick={onClickCategory} data-nav="0">ブース一覧</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="1">飲食</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="2">物販</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="3">貯める力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="4">稼ぐ力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="5">増やす力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="6">守る力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="7">使う力</button>
          <button className="nav-btn" onClick={onClickCategory} data-nav="8">その他</button>
        </div>

        <div className="shops">
          {shops.map((shop) => {
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
        </div>

      </div>
    </>
  );
}

export default App;
