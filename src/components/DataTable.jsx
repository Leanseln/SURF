import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DataTable = ({ surveyData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!surveyData || surveyData.length === 0) return <p>No survey data available.</p>;

  const headers = surveyData[0]; // First row is headers
  const rows = surveyData.slice(1); // Remaining rows

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-slate-50">
              {headers.map((header, index) => (
                <TableHead 
                  key={index} 
                  className={`text-center px-3 py-4 align-top border-b border-slate-200 w-48 ${
                    index !== 0 ? 'border-l border-slate-200' : ''
                  }`}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-slate-800 text-sm leading-tight truncate max-w-full">
                            {header}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{header}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex} 
                    className={`text-center px-3 py-3 text-sm truncate max-w-xs ${
                      cellIndex !== 0 ? 'border-l border-slate-200' : ''
                    }`}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink 
                  onClick={() => paginate(pageNumber)}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

DataTable.propTypes = {
  surveyData: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default DataTable;