import React, { useEffect, useState } from "react";
import ListItem from "../ListItems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";
import { useParams } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams()

  useEffect(() => {
    async function fetchItems() {
      try {
        let slug = `items.json`
        if(params.category) {
          slug = `items-${params.category}.json`
        }
        const response = await axios.get(
          `https://super-kart-51457-default-rtdb.firebaseio.com/${slug}`
        );
        const data = response.data;
        const transformedData = data.map((item, index) => {
          return {
            ...item,
            id: index,
          };
        });
        setItems(transformedData);
      } 
      catch (error) {
        console.log("Error ",error);
        alert("Error occurred!!")
      }
      finally{
        setLoader(false);
      }
    }

    fetchItems();

    return () => {
      setItems([])
      setLoader(true)
    }
  }, [params]);

  return (
    <>
    <div className={"product-list"}>
      <div className={"product-list--wrapper"}>
        {items.map((item) => {
          return <ListItem key={item.id} data={item} />;
        })}
      </div>
    </div>
   { loader && <Loader/>}
    </>
  );
};

export default Products;


























