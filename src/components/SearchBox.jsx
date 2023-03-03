import React from "react";
import "./SearchBox.css";

const SearchBox = (props) => {
  const { inputValue, handleInputChange, keywordSearch } = props;
  return (
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
  );
};

export default SearchBox;
