import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

const DynamicTable = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No hay datos disponibles</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                <div className="flex items-center justify-between">
                  {column.header}
                  <ChevronUpDownIcon className="w-4 h-4 ml-1" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {column.accessor ? column.accessor(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DynamicTable