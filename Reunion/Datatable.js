
import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Button,
  TextField,
  MenuItem,
  Slider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { format } from 'date-fns';
import sampleData from './sample-data.json'; // Ensure you have this JSON file in your src folder

const DataTable = () => {
  const [data, setData] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    setData(sampleData);
  }, []);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'subcategory',
      header: 'Subcategory',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: info => format(new Date(info.getValue()), 'dd-MMM-yyyy HH:mm'),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    columnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDateRangeChange = (event) => {
    setDateRange([event.target.value[0], event.target.value[1]]);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchInput}
        onChange={handleSearch}
      />
      <Button onClick={() => setOpenFilterDialog(true)}>Filter</Button>

      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th key={column.id}>
                  {column.renderHeader()}
                  <div>
                    <button onClick={() => column.toggleSorting()}>
                      Sort
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={openFilterDialog} onClose={() => setOpenFilterDialog(false)}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <h3>Price Range</h3>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
          <h3>Date Range</h3>
          {/* Implement Date Range Inputs */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFilterDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
