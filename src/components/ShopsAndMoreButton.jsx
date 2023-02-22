import React from "react";
import "./ShopsAndMoreButton.css";

const ShopsAndMoreButton = (props) => {
  const selectedCategory = props.selectedCategory;
  const shops = props.shops;
  const loadIndex = props.loadIndex;
  const hasNext = props.hasNext;
  const displayMore = props.displayMore;

  return (
    <>
      <div className="shops">
        {selectedCategory !== "" && <div>{selectedCategory}</div>}
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
    </>
  );
};

export default ShopsAndMoreButton;
