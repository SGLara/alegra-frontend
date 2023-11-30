import { Box, Chip, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getIngredientsAvailable } from '../api/warehouse-service'

export default function Inventory () {
  const [inventory, setInventory] = useState([])

  useEffect(() => {
    try {
      (async () => {
        const response = await getIngredientsAvailable()

        setInventory(response.data)
      })()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <Paper elevation={2} sx={{ p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Food Storage and Inventory
      </Typography>
      <Box sx={{ height: '30rem', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {inventory.map(item => (
            <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'left' }}>
              <ListItemText primary={`${item.name}:`} />
              <Chip label={item.available_units} size='small' sx={{ bgcolor: '#00A295', color: 'white' }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}
