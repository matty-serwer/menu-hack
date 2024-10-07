import React, { createContext, useState, ReactNode } from "react";
import menuItems from "@/data/menuItems";

interface Item {
  id: number;
  name: string;
  price: number;
  color: string;
}

interface Ticket {
  id: number;
  items: Item[];
}

interface TicketContextType {
  availableItems: typeof menuItems;
  currentTicket: Ticket | null;
  allTickets: Ticket[];
  addItemToTicket: (item: Item) => void;
  sendTicket: () => void;
}

export const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);

  const addItemToTicket = (item: Item) => {
    if (!currentTicket) {
      setCurrentTicket({ id: Date.now(), items: [item] });
    } else {
      setCurrentTicket({
        ...currentTicket,
        items: [...currentTicket.items, item],
      });
    }
  };

  const sendTicket = () => {
    if (currentTicket) {
      setAllTickets([...allTickets, currentTicket]);
      setCurrentTicket(null);
    }
  };

  return (
    <TicketContext.Provider
      value={{ availableItems: menuItems, currentTicket, allTickets, addItemToTicket, sendTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};