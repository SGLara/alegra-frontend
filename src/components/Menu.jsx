import { Box, Chip, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getRecipes } from '../api/kitchen-service'

const fetchRecipes = async () => {
  const response = await getRecipes()
  return response.data
}

export default function Menu () {
  const [recipes, setRecipes] = useState([])
  const { data: recipesData, error, isLoading } = useQuery('recipes', fetchRecipes)

  useEffect(() => {
    if (recipesData && !isLoading) {
      setRecipes(recipesData)
    }
  }, [isLoading, recipesData])

  return (
    <Paper elevation={2} sx={{ gridArea: 'menu', p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Recipes Menu
      </Typography>
      <Box sx={{ height: '30rem', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {
          isLoading
            ? <CircularProgress color='success' />
            : (
                recipes.length !== 0
                  ? (
                      recipes.map(recipe => (
                        <ListItem key={`r-${recipe.id}`}>
                          <Paper
                            sx={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 1,
                              padding: 1,
                              bgcolor: '#028176'
                            }}
                          >
                            <ListItemText
                              primary={`${recipe.name}:`}
                              sx={{ color: 'white' }}
                            />
                            <Paper sx={{ bgcolor: '#00A295' }}>
                              <List sx={{ display: 'flex', flexDirection: 'row' }}>
                                {recipe.ingredients.map(ingredient => (
                                  <ListItem key={`i-${ingredient.id}`} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <ListItemText primary={ingredient.name} sx={{ color: 'white' }} />
                                    <Chip label={ingredient.quantity} size='small' sx={{ bgcolor: '#028176', color: 'white' }} />
                                  </ListItem>
                                ))}
                              </List>
                            </Paper>
                          </Paper>
                        </ListItem>
                      ))
                    )
                  : (
                    <Typography variant='h4' textAlign='center'>No recipes</Typography>
                    )
              )
          }
          {error && <Typography>{error.message}</Typography>}
        </List>
      </Box>
    </Paper>
  )
}
