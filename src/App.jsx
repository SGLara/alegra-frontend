// Import necessary dependencies
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { setOrder } from './api/order-service'
import Inventory from './components/Inventory'
import KitchenOrderQueue from './components/KitchenOrderQueue'
import Menu from './components/Menu'
import OrderHistory from './components/OrderHistory'
import PurchaseHistory from './components/PurchaseHistory'

// Main App component
export default function App () {
  const placeOrder = async () => {
    return setOrder()
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        margin: '2.5rem auto 2rem'
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
          backgroundColor: '#00A295'
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
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '2px solid #ccc',
            padding: '1rem'
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
