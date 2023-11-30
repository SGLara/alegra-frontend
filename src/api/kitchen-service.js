import axios from 'axios'

export const url = import.meta.env.VITE_ALEGRA_KITCHEN_SERVICE_URL

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${url}/recipes`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getDishes = async () => {
  try {
    const response = await axios.get(`${url}/dishes`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
