import { useEffect, useMemo, useRef, useState } from "react";

type Agency = {
  id: string;
  name: string;
  logo: string;
};

type Agent = {
  id: string;
  first_name: string;
  last_name: string;
  image: string;
};

type Props = {
  type: "agencies" | "agents";
  agenciesData?: Agency[];
  agentsData?: Agent[];
  setSearchQuery: (value: string) => void;
};

type NormalizedItem = {
  id: string;
  name: string;
  image: string;
};

export default function FindAgentsSearch({
  type,
  agenciesData = [],
  agentsData = [],
  setSearchQuery,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const items: NormalizedItem[] = useMemo(() => {
    if (type === "agencies") {
      return agenciesData.map((a) => ({
        id: a.id,
        name: a.name,
        image: a.logo,
      }));
    }

    return agentsData.map((a) => ({
      id: a.id,
      name: `${a.first_name ?? ""} ${a.last_name ?? ""}`.trim(),
      image: a.image,
    }));
  }, [type, agenciesData, agentsData]);

  const filteredItems = useMemo(() => {
    if (!query) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  const handleSelect = (item: NormalizedItem) => {
    setQuery(item.name);
    setSearchQuery(item.name);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <input
        value={query}
        placeholder={`Search ${type}...`}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full border rounded-md px-3 py-2"
      />

      {open && (
        <div className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow max-h-64 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">No results</div>
          )}
        </div>
      )}
    </div>
  );
}