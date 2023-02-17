import { useState } from "react";

//表示するブース
const [shops, setShops] = useState([]);
//全てのブース情報
const [allShops, setAllShops] = useState([]);

//データの取得
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

const Shops = () => {
    return(

    );

}

export default Shops;