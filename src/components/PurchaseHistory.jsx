import { Box, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getPurchaseHistory } from '../api/warehouse-service'

const fetchPurchaseHistory = async () => {
  const response = await getPurchaseHistory()
  return response.data
}

export default function PurchaseHistory () {
  const [purchasesHistory, setPurchasesHistory] = useState([])
  const { data: purchaseHistory, error, isLoading } = useQuery('purchaseHistory', fetchPurchaseHistory)

  useEffect(() => {
    if (purchaseHistory && !isLoading) {
      setPurchasesHistory(purchaseHistory)
    }
  }, [isLoading, purchaseHistory])

  return (
    <Paper elevation={2} sx={{ gridArea: 'purchaseHistory', p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Purchase History
      </Typography>
      <Box sx={{ height: '30rem', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {
          isLoading
            ? <CircularProgress color='success' />
            : (
                purchasesHistory.length !== 0
                  ? (
                      purchasesHistory.map(history => (
                        <ListItem key={history.id}>
                          <ListItemText primary={`Date: ${moment(history.created_at).format('MM/DD/YYYY, h:mm a')} -- Item: ${history.name} -- Quantity: ${history.quantity}`} />
                        </ListItem>
                      ))
                    )
                  : (
                    <Typography variant='h4' textAlign='center'>No purchases yet</Typography>
                    )
              )
          }
          {error && <Typography>{error.message}</Typography>}
        </List>
      </Box>
    </Paper>
  )
}
