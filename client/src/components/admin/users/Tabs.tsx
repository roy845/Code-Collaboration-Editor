import { FaChartBar } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";

type TabsProps = {
  activeTab: "table" | "chart";
  setActiveTab: (tab: "table" | "chart") => void;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4 border-b border-gray-300 dark:border-gray-600 mb-6">
      <div
        onClick={() => setActiveTab("table")}
        className={`px-4 py-2 cursor-pointer ${
          activeTab === "table"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-400 hover:text-blue-500"
        }`}
      >
        <span className="flex justify-center gap-4">
          Table
          <span className="mt-1">
            <CiViewTable />
          </span>
        </span>
      </div>
      <div
        onClick={() => setActiveTab("chart")}
        className={`px-4 py-2 cursor-pointer ${
          activeTab === "chart"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-400 hover:text-blue-500"
        }`}
      >
        <span className="flex justify-center gap-4">
          Graphs
          <span className="mt-1">
            <FaChartBar />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Tabs;
