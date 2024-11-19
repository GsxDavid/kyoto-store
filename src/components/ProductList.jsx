import { useEffect, useState } from 'react'
import axios from 'axios'
import DynamicTable from './DynamicTable'
import { API_URL } from '../config'

export default function ProductList() {
    
  const columns = [
    { header: 'ID', key: '_id' },
    { header: 'Nombre', key: 'name' },
    { header: 'Categoría', key: 'category' },
    {
      header: 'Precio',
      key: 'price',
      accessor: row => `$${row.price.toFixed(2)}`
    },
    { 
        header: 'Imagen', 
        key: 'image', 
        accessor: (row) => (
          <img 
            src={row.image} 
            alt={row.name} 
            className="w-16 h-16 object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
            }}
          />
        )
      }
  ]

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/products`).then(res => {
      setProducts(res.data.data) // El servidor devuelve los datos en un objeto con la estructura {success: true, data: [...]}
    })
  }, [])

  return (
    <div>
      <p className='text-xl mb-4'>Lista de productos</p>
      <DynamicTable data={products} columns={columns} />
    </div>
  )
}
