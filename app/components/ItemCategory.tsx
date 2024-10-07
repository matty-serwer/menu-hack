import React from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  color: string;
};

type ItemCategoryProps = {
  category: string;
  items: Item[];
  addItemToTicket: (item: Item) => void;
};

const ItemCategory: React.FC<ItemCategoryProps> = ({
  category,
  items,
  addItemToTicket,
}) => {
  return (
    <div>
      <h2 className="text-xl mb-2 capitalize">{category}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            className={`px-4 py-2 rounded text-white bg-${item.color}-500 hover:bg-${item.color}-600 transition`}
            onClick={() => addItemToTicket(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemCategory;