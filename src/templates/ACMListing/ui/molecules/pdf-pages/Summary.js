// components/pdf/Summary.js
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';
import { summaryData } from '../../../functionality/pdfDataConstant';

const Summary = ({ acmData }) => {
  const baseProperty = acmData.base_property || {};

  const formatValue = (key, value) => {
    if (value === 'N/D' || !value) return 'N/D';
    if (key === 'sale_price' || key === 'ppu') {
      return `${parseInt(value.replace(/,/g, '')).toLocaleString()} $`;
    }
    return value;
  };

  const tablesConfig = [
    {
      title: 'PRICE PER UNIT',
      dataKey: 'pricePerUnit',
      headers: ['AREA', 'ADDRESS', 'UNITS', 'SALE PRICE', 'PPU', 'UNIT BREAKDOWN', 'DATE SOLD'],
      keys: ['area', 'address', 'units', 'sale_price', 'ppu', 'unit_breakdown', 'sold_date'],
    },
    {
      title: 'GROSS REVENUE MULTIPLIER',
      dataKey: 'grossRevenueMultip',
      headers: ['AREA', 'ADDRESS', 'UNITS', 'SALE PRICE', 'GRM', 'HEATING', 'HOT WATER', 'DATE SOLD'],
      keys: ['area', 'address', 'units', 'sale_price', 'grm', 'heating', 'hot_water', 'sold_date'],
    },
    {
      title: 'CAP RATE',
      dataKey: 'capRate',
      headers: ['AREA', 'ADDRESS', 'UNITS', 'SALE PRICE', 'PPU', 'GRM', 'CAPRATE', 'NRM', 'DATE SOLD'],
      keys: ['area', 'address', 'units', 'sale_price', 'ppu', 'grm', 'cap_rate', 'nrm', 'sold_date'],
    },
  ];

  return (
    <div
      className="w-full bg-gray-100 min-h-screen p-8 flex flex-col"
      style={{ height: '1120px', width: '794px' }}
    >
      {/* Header */}
      <PdfHeader acmData={acmData} />

      <div className="max-w-7xl mx-auto space-y-8">
        {tablesConfig.map((table, tableIndex) => {
          const tableData = summaryData[tableIndex][table.dataKey];
          const rowCount = tableData[0][table.keys[0]].length;

          return (
            <div key={tableIndex} className=" rounded-lg shadow-sm overflow-hidden">
              <div className="mt-3">
                <h2 className="text-xl font-bold border-b border-primary-default pb-2">{table.title}</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg mt-2">
                <table className="w-full text-xs">
                  <thead className="">
                    <tr>
                      {table.headers.map((header, i) => (
                        <th
                          key={i}
                          className={`gap-4 p-1 bg-gray-100 font-bold text-sm uppercase tracking-wide border-b border-primary-default pb-2 ${
                            i === table.headers.length - 1 ? '' : ''
                          } text-center`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                      <tr key={rowIndex} className="uppercase">
                        {table.keys.map((key, colIndex) => {
                          const value = tableData[colIndex][key][rowIndex];
                          const formattedValue = formatValue(key, value);

                          return (
                            <td
                              key={colIndex}
                              className={`px-3 p-1 border-b font-semibold text-xs text-gray-800 ${
                                colIndex === table.keys.length - 1 ? '' : ''
                              } ${
                                colIndex === 2
                                  ? 'text-center'
                                  : colIndex >= 3
                                  ? 'text-center'
                                  : 'text-left'
                              }`}
                            >
                              {formattedValue}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
