import { Link, useLocation } from 'react-router-dom'
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Confirmation() {
  const location = useLocation()
  const { orderNumber, total } = location.state || { orderNumber: '000000', total: 0 }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" aria-hidden="true" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">¡Gracias por tu compra!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Tu pedido ha sido confirmado y será enviado pronto.
            </p>
          </div>

          <dl className="mt-8 space-y-6">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Número de orden</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderNumber}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              Volver a la tienda
            </Link>
            <Link
              to="/account"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ver mi cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}