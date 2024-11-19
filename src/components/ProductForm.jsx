import { useRef, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { API_URL } from '../config';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null)

  function jsonToFormData(json) {
    const formData = new FormData();
    
    for (const key in json) {
      if (json[key] instanceof Object && !(json[key] instanceof File)) {
        formData.append(key, JSON.stringify(json[key]));
      } else {
        formData.append(key, json[key]);
      }
    }
  
    return formData;
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      image: null
    })
    fileInputRef.current.value = ''
    setPreviewImage(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = jsonToFormData(formData)

    axios.post(`${API_URL}/products`, data)
    .then(res => {
      if (res.data.success) {
        alert("Se ha creado el producto correctamente")
        resetFormData()
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
          >
            <option value="Classics">Classics</option>
            <option value="Performance">Performance</option>
            <option value="Terrex">Terrex</option>
            <option value="Casual">Casual</option>
            <option value="Skateboarding">Skateboarding</option>
            <option value="Style">Style</option>
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen</label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              {previewImage ? (
                <img src={previewImage} alt="Vista previa" className="h-full w-full object-cover" />
              ) : (
                <PlusIcon className="h-full w-full text-gray-300" />
              )}
            </span>
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;