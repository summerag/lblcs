import React, { useState, useEffect } from "react";
import networkService from "../../services/network";
import ListItem from "./listItem";

const Lists = (props) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    networkService.getAll(props.url).then((initialItems) => setItems(initialItems));
  }, [props.url]);
  return (
    <div>
      <h1>{props.pageTitle}</h1>
      {items.map((item) => (
        <ListItem key={item.id} player={item} />
      ))}
    </div>
  );
};
export default Lists;
