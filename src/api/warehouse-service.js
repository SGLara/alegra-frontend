import axios from 'axios'

export const url = import.meta.env.VITE_ALEGRA_WAREHOUSE_SERVICE_URL

export const getIngredientsAvailable = async () => {
  const response = await axios.get(`${url}/ingredients`)
  return response.data
}

export const getPurchaseHistory = async () => {
  const response = await axios.get(`${url}/ingredients/purchase-history`)
  return response.data
}
