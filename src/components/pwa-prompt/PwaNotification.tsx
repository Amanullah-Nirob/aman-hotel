import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { forwardRef, ReactNode } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../app/slices/theme/ThemeSlice'

const PWANotification = forwardRef<
  HTMLDivElement,
  {
    onCancel: () => void
    onOk: () => void
    okText: string
    title: string
    show: boolean
    children: ReactNode
  }
>(function PwaNotification(
  { show, okText, children, onCancel, onOk, title },
  ref
) {
  const theme=useAppSelector(selectTheme)
  const matchesMobile = useMediaQuery('(max-width:600px)');
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Box
        ref={ref}
        sx={{
          backgroundColor: '#0077ff',
          color:  theme==='light'?'#000':'#fff',
        }}
        className='installBanner_main'
      >
      <Container>
        <div className="notification_content_box">
        <Box className="notification_box">
        {title ? (
            <Typography
              component="h2"
              sx={{
                fontWeight: 'bold',
                margin: 0,
                fontSize: '18px'
              }}
            >
              {title}
            </Typography>
          ) : null}
          {children}
        </Box>
        <Box className="notification_actions">
        <Button
            sx={{ mr: 1,backgroundColor:'#fff',color:'#000' }}
            onClick={onOk}
            variant="contained"
          >
            {okText}
          </Button>
        <Button
            sx={{ mr: 1,backgroundColor:'#fff',color:'#000' }}
            onClick={onCancel}
            variant="outlined"
            disableElevation
          >
            later
          </Button>
        </Box>
        </div>
        </Container>
      </Box>
    </Slide>
  )
})

export { PWANotification }
