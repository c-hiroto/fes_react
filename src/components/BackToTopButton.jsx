import React, { useState, useEffect } from "react";
import "./BackToTopButton.css";

const BackToTopButton = () => {
  //ページトップへスクロールするボタンの表示
  const [pageTopButton, setPageTopButton] = useState(false);
  //スクロール量の定義
  const PAGE_Y_OFFSET_LIMIT = 100;

  //トップへ戻るボタンの表示を切り替える
  const changePageTopButtonShow = () => {
    if (window.pageYOffset > PAGE_Y_OFFSET_LIMIT) {
      setPageTopButton(true);
    } else {
      setPageTopButton(false);
    }
  };

  //スクロールに関して管理
  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  //スクロールについて監視し、ボタンの表示を管理する関数を呼び出す
  useEffect(() => {
    window.addEventListener("scroll", changePageTopButtonShow);
    return () => window.removeEventListener("scroll", changePageTopButtonShow);
  }, []);

  return (
    <>
      {pageTopButton && (
        <div className="page-top" onClick={onScrollTop}>
          <button>↑</button>
        </div>
      )}
    </>
  );
};

export default BackToTopButton;
