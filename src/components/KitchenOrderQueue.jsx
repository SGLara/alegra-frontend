import { Box, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getOrders } from '../api/order-service'

const fetchKitchenOrders = async () => {
  const response = await getOrders()
  return response.data
}

export default function KitchenOrderQueue () {
  const [orders, setOrders] = useState([])
  const { data: kitchenOrders, error, isLoading } = useQuery('kitchenOrders', fetchKitchenOrders)

  useEffect(() => {
    if (kitchenOrders && !isLoading) {
      setOrders(kitchenOrders)
    }
  }, [isLoading, kitchenOrders])

  return (
    <Paper elevation={2} sx={{ gridArea: 'kitchen', p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Kitchen Order Queue
      </Typography>
      <Box sx={{ height: '100%', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {
          isLoading
            ? <CircularProgress color='success' />
            : (
                orders.length !== 0
                  ? (
                      orders.map(order => (
                        <ListItem key={order.id}>
                          <ListItemText primary={`Order ${order.id}: ${order.status}`} />
                        </ListItem>
                      ))
                    )
                  : (
                    <Typography variant='h4' textAlign='center'>No orders</Typography>
                    )
              )
            }
          {error && <Typography>{error.message}</Typography>}
        </List>
      </Box>
    </Paper>
  )
}
