// Import necessary dependencies
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { useQueryClient } from 'react-query'
import { setOrder } from './api/order-service'
import Inventory from './components/Inventory'
import KitchenOrderQueue from './components/KitchenOrderQueue'
import Menu from './components/Menu'
import OrderHistory from './components/OrderHistory'
import PurchaseHistory from './components/PurchaseHistory'

// Main App component
export default function App () {
  const queryClient = useQueryClient()

  const placeOrder = async () => {
    await setOrder()

    queryClient.invalidateQueries('kitchenOrders')
    queryClient.invalidateQueries('inventory')
    queryClient.invalidateQueries('purchaseHistory')
    queryClient.invalidateQueries('orderHistory')
    queryClient.invalidateQueries('recipes')
  }

  return (
    <Container
      maxWidth='xl'
      sx={{
        margin: '2.5rem auto 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          p: 4,
          backgroundColor: '#00A295',
          maxHeight: '80rem'
        }}
      >
        <Typography
          variant='h4'
          textAlign='center'
        >
          Alegra Restaurant
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={placeOrder}
        >
          Order Dish
        </Button>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: '50% 50%',
            gridTemplateAreas: `
            "kitchen inventory purchaseHistory orderHistory"
            "kitchen menu menu menu"
            `,
            gap: 2,
            border: '2px solid #ccc',
            padding: '2rem',
            maxHeight: '55rem'
          }}
        >
          <KitchenOrderQueue />
          <Inventory />
          <PurchaseHistory />
          <OrderHistory />
          <Menu />
        </Box>
      </Paper>
    </Container>
  )
}
