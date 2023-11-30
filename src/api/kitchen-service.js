import axios from 'axios'

export const url = import.meta.env.VITE_ALEGRA_KITCHEN_SERVICE_URL

export const getRecipes = async () => {
  const response = await axios.get(`${url}/recipes`)
  return response.data
}

export const getDishes = async () => {
  const response = await axios.get(`${url}/dishes`)
  return response.data
}
