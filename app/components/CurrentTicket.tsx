import React from "react";

type Item = {
  id: number;
  name: string;
  price: number;
};

type CurrentTicketProps = {
  currentTicket: {
    items: Item[];
  };
  sendTicket: () => void;
};

const CurrentTicket: React.FC<CurrentTicketProps> = ({
  currentTicket,
  sendTicket,
}) => {
  return (
    <div className="mt-4 p-4 bg-white shadow rounded">
      <h3 className="text-lg mb-2">Current Ticket:</h3>
      <ul className="list-disc list-inside">
        {currentTicket.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <button
        className="mt-2 px-4 py-2 bg-tiffany-blue text-white rounded hover:bg-tiffany-blue-dark transition"
        onClick={sendTicket}
      >
        Send Order
      </button>
    </div>
  );
};

export default CurrentTicket;