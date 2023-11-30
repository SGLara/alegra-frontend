import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getOrders } from '../api/order-service'

export default function KitchenOrderQueue () {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try {
      (async () => {
        const response = await getOrders()

        setOrders(response.data)
      })()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <Paper elevation={2} sx={{ p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Kitchen Order Queue
      </Typography>
      <Box sx={{ height: '30rem', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {
            orders.length !== 0
              ? orders.map(order => (
                <ListItem key={order.id}>
                  <ListItemText primary={`Order ${order.id}: ${order.status}`} />
                </ListItem>
              ))
              : (
                <Typography variant='h4' textAlign='center'>No orders</Typography>
                )
          }
        </List>
      </Box>
    </Paper>
  )
}
