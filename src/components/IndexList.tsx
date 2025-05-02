
import { useData } from "@/contexts/DataContext";

const IndexList = () => {
  const { indexNames, selectedIndex, setSelectedIndex } = useData();

  return (
    <div className="h-full w-full overflow-auto">
      <h2 className="text-xl font-bold mb-4 px-4">Stock Indexes</h2>
      <ul className="space-y-1">
        {indexNames.map((indexName) => (
          <li key={indexName}>
            <button
              onClick={() => setSelectedIndex(indexName)}
              className={`w-full text-left px-4 py-2 transition-colors ${
                selectedIndex === indexName
                  ? "bg-financial-blue text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {indexName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexList;
