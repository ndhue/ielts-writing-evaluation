import { Button, Input } from "@/components";
import { EssayFilters } from "@/hooks/useEssayEvaluation";
import React, { useState } from "react";

interface EssayFiltersProps {
  filters: EssayFilters;
  updateFilters: (filters: Partial<EssayFilters>) => void;
}

export const EssayFiltersComponent: React.FC<EssayFiltersProps> = ({
  filters,
  updateFilters,
}) => {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchValue });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "date_asc") {
      updateFilters({ sortBy: "date", sortOrder: "asc" });
    } else if (value === "date_desc") {
      updateFilters({ sortBy: "date", sortOrder: "desc" });
    } else if (value === "score_asc") {
      updateFilters({ sortBy: "score", sortOrder: "asc" });
    } else if (value === "score_desc") {
      updateFilters({ sortBy: "score", sortOrder: "desc" });
    }
  };

  const handleDateFilterChange = (
    field: "fromDate" | "toDate",
    value: string
  ) => {
    updateFilters({ [field]: value });
  };

  const clearFilters = () => {
    setSearchValue("");
    updateFilters({
      search: undefined,
      fromDate: undefined,
      toDate: undefined,
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-medium text-lg mb-4">Filter Essays</h2>

      {/* Search */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search by topic or content"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="rounded-md"
            label="Search"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={`${filters.sortBy}_${filters.sortOrder}`}
            onChange={handleSortChange}
            className="border rounded-md px-4 py-1 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border-border text-sm text-slate-600"
          >
            <option value="date_desc">Date (Newest First)</option>
            <option value="date_asc">Date (Oldest First)</option>
            <option value="score_desc">Score (Highest First)</option>
            <option value="score_asc">Score (Lowest First)</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={filters.fromDate || ""}
            onChange={(e) => handleDateFilterChange("fromDate", e.target.value)}
            className="border rounded-md px-4 py-1 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border-border text-sm text-slate-600"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={filters.toDate || ""}
            onChange={(e) => handleDateFilterChange("toDate", e.target.value)}
            className="border rounded-md px-4 py-1 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border-border text-sm text-slate-600"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={clearFilters}
          className="rounded-md"
          label="Clear Filters"
        />
      </div>
    </div>
  );
};

export default EssayFiltersComponent;
