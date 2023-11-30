import axios from 'axios'

export const url = import.meta.env.VITE_ALEGRA_ORDER_SERVICE_URL

export const getOrders = async () => {
  try {
    const response = await axios.get(`${url}/orders`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const setOrder = async () => {
  try {
    const response = await axios.post(`${url}/orders`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
