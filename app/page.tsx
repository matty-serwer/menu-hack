"use client";

import { useState, useContext, useMemo } from "react";
import { TicketProvider, TicketContext } from "./context/TicketContext";
import SearchBar from "./components/SearchBar";
import ItemCategory from "./components/ItemCategory";
import CurrentTicket from "./components/CurrentTicket";

export default function Home() {
  return (
    <TicketProvider>
      <POS />
    </TicketProvider>
  );
}

function POS() {
  const {
    availableItems,
    addItemToTicket,
    currentTicket,
    sendTicket,
  } = useContext(TicketContext)!;
  const [searchTerm, setSearchTerm] = useState("");

  type Item = {
    id: number;
    name: string;
    price: number;
    color: string;
  };

  type AvailableItems = {
    [category: string]: Item[];
  };

  // Ensure availableItems is defined; replace with actual data or fetch logic
  const items: AvailableItems = availableItems || {
    // Example data structure
    beverages: [
      { id: 1, name: "Coffee", price: 2.5, color: "brown" },
      { id: 2, name: "Tea", price: 2.0, color: "green" },
    ],
    pastries: [
      { id: 3, name: "Croissant", price: 3.0, color: "golden" },
      { id: 4, name: "Muffin", price: 2.5, color: "blue" },
    ],
    // Add more categories and items as needed
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    const lowerSearch = searchTerm.toLowerCase();
    return Object.keys(items).reduce<AvailableItems>((acc, category) => {
      const filtered = items[category].filter((item) =>
        item.name.toLowerCase().includes(lowerSearch)
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    }, {});
  }, [searchTerm, items]);

  return (
    <div className="bg-gray-750 min-h-screen p-8">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(filteredItems).map(([category, items]) => (
          <ItemCategory
            key={category}
            category={category}
            items={items}
            addItemToTicket={addItemToTicket}
          />
        ))}
      </div>
      {currentTicket && (
        <CurrentTicket currentTicket={currentTicket} sendTicket={sendTicket} />
      )}
    </div>
  );
}
