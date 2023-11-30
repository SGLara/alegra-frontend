import axios from 'axios'

export const url = import.meta.env.VITE_ALEGRA_WAREHOUSE_SERVICE_URL

export const getIngredientsAvailable = async () => {
  try {
    const response = await axios.get(`${url}/ingredients`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getPurchaseHistory = async () => {
  try {
    const response = await axios.get(`${url}/ingredients/purchase-history`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
