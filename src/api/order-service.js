import axios from 'axios'

export const url = import.meta.env.VITE_ALEGRA_ORDER_SERVICE_URL

export const getOrders = async () => {
  const response = await axios.get(`${url}/orders`)
  return response.data
}

export const setOrder = async () => {
  const response = await axios.post(`${url}/orders`)
  return response
}
