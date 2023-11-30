import { Box, Chip, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getIngredientsAvailable } from '../api/warehouse-service'

const fetchInventory = async () => {
  const response = await getIngredientsAvailable()
  return response.data
}

export default function Inventory () {
  const [inventory, setInventory] = useState([])
  const { data: ingredients, error, isLoading } = useQuery('inventory', fetchInventory)

  useEffect(() => {
    if (ingredients && !isLoading) {
      setInventory(ingredients)
    }
  }, [isLoading, ingredients])

  return (
    <Paper elevation={2} sx={{ gridArea: 'inventory', p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Food Storage and Inventory
      </Typography>
      <Box sx={{ height: '30rem', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {
          isLoading
            ? <CircularProgress color='success' />
            : (
                inventory.length !== 0
                  ? (
                      inventory.map(item => (
                        <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'left' }}>
                          <ListItemText primary={`${item.name}:`} />
                          <Chip label={item.available_units} size='small' sx={{ bgcolor: '#00A295', color: 'white' }} />
                        </ListItem>
                      ))
                    )
                  : (
                    <Typography variant='h4' textAlign='center'>No inventory yet</Typography>
                    )
              )
          }
          {error && <Typography>{error.message}</Typography>}
        </List>
      </Box>
    </Paper>
  )
}
