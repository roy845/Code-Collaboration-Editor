import { useState } from "react";

export const useSearch = <T>(items: T[], key: keyof T) => {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item[key]?.toString().toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredItems };
};
