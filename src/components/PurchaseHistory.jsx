import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getPurchaseHistory } from '../api/warehouse-service'

export default function PurchaseHistory () {
  const [purchasesHistory, setPurchasesHistory] = useState([])

  useEffect(() => {
    try {
      (async () => {
        const response = await getPurchaseHistory()

        setPurchasesHistory(response.data)
      })()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <Paper elevation={2} sx={{ p: 3, bgcolor: '#5A5A61', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white' }}>
        Purchase History
      </Typography>
      <Box sx={{ height: '30rem', overflowY: 'auto', bgcolor: 'white' }}>
        <List>
          {
          purchasesHistory.length !== 0
            ? purchasesHistory.map(history => (
              <ListItem key={history.id}>
                <ListItemText primary={`Date: ${moment(history.created_at).format('MM/DD/YYYY, h:mm a')} -- Item: ${history.name} -- Quantity: ${history.quantity}`} />
              </ListItem>
            ))
            : (
              <Typography variant='h4' textAlign='center'>No purchases yet</Typography>
              )
        }
        </List>
      </Box>
    </Paper>
  )
}
