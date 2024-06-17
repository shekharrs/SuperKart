import React, { useEffect, useState } from "react";
import ListItem from "../ListItems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";

const Products = ({ onAddItem, onRemoveItem, eventState}) => {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get(
          `https://react-series-5c6bf-default-rtdb.firebaseio.com/items.json`
        );
        const data = response.data;
        const transformedData = data.map((item, index) => {
          return {
            ...item,
            quantity: 0,
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
  }, []);

  useEffect(() => {
    if(eventState.id > -1) {
      if(eventState.type === 1) {
        handleAddItem(eventState.id)
      }
      else if(eventState.type === -1) {
        handleRemoveItem(eventState.id)
      }
    }
  }, [eventState])

  const handleAddItem = id => {
    // console.log(id)
    // if(presentItems.indexOf(id) > -1) {
    //   return;
    // }
    // setPresentItems([...presentItems, id]);
    // onAddItem();
    let data = [...items]
    let index = data.findIndex(i => i.id === id)
    data[index].quantity += 1
    setItems([...data])
    onAddItem(data[index]);
  }

  const handleRemoveItem = id => {
    // let index = presentItems.indexOf(id)
    // if(index > -1) {
    //   let items = [...presentItems]
    //   items.splice(index, 1)
    //   setPresentItems([...items]);
    //   onRemoveItem();
    // }
    let data = [...items]
    let index = data.findIndex(i => i.id === id)
    if(data[index].quantity !== 0) {
      data[index].quantity -= 1
      setItems([...data])
      onRemoveItem(data[index])
    }
  }

  return (
    <>
    <div className={"product-list"}>
      <div className={"product-list--wrapper"}>
        {/* <ListItem data={items[0]}></ListItem>
        <ListItem data={items[1]}></ListItem> */}
        {items.map((item) => {
          return <ListItem onAdd={handleAddItem} onRemove={handleRemoveItem} key={item.id} data={item} />;
        })}
      </div>
    </div>
   { loader && <Loader/>}
    </>
  );
};

export default Products;
