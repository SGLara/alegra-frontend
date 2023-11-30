import { Box, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getDishes } from '../api/kitchen-service'

const fetchDishes = async () => {
  const response = await getDishes()
  return response.data
}

export default function OrderHistory () {
  const [dishes, setDishes] = useState([])
  const { data: orderHistory, error, isLoading } = useQuery('orderHistory', fetchDishes)

  useEffect(() => {
    if (orderHistory && !isLoading) {
      setDishes(orderHistory)
    }
  }, [isLoading, orderHistory])

  return (
    <Paper elevation={2} sx={{ gridArea: 'orderHistory', p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Order History
      </Typography>
      <Box sx={{ height: '30rem', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {
          isLoading
            ? <CircularProgress color='success' />
            : (
                dishes.length !== 0
                  ? (
                      dishes.map(order => (
                        <ListItem key={order.id}>
                          <ListItemText
                            primary={`Order ID: ${order.id} - Dish: ${order.recipe.name} - Date: ${moment(order.created_at).format('MM/DD/YYYY, h:mm a')}`}
                          />
                        </ListItem>
                      ))
                    )
                  : (
                    <Typography variant='h4' textAlign='center'>No order history yet</Typography>
                    )
              )
          }
          {error && <Typography>{error.message}</Typography>}
        </List>
      </Box>
    </Paper>
  )
}
