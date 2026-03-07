import React from 'react';
import { BoatFilters } from '../services/boatService';
import './FilterPanel.css';

interface FilterPanelProps {
  filters: BoatFilters;
  onFiltersChange: (filters: BoatFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof BoatFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>Min Price</label>
        <input
          type="number"
          value={filters.minPrice || ''}
          onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
          placeholder="€0"
        />
      </div>
      
      <div className="filter-group">
        <label>Max Price</label>
        <input
          type="number"
          value={filters.maxPrice || ''}
          onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
          placeholder="€1000"
        />
      </div>

      <div className="filter-group">
        <label>Min Rating</label>
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={filters.minRating || ''}
          onChange={(e) => updateFilter('minRating', e.target.value ? Number(e.target.value) : undefined)}
          placeholder="0"
        />
      </div>

      <div className="filter-group">
        <label>Capacity</label>
        <input
          type="number"
          min="1"
          value={filters.capacity || ''}
          onChange={(e) => updateFilter('capacity', e.target.value ? Number(e.target.value) : undefined)}
          placeholder="Any"
        />
      </div>
    </div>
  );
};

export default FilterPanel;


