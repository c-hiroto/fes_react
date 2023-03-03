import React from "react";
import "./Nav.css";

const Nav = (props) => {
  const { onClickCategory } = props;
  return (
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
  );
};

export default Nav;
