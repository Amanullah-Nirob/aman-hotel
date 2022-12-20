import {PWANotification}  from './PwaNotification'
import Box from '@mui/material/Box'

const InstallBanner=({ onCancel, onOk, show}: { onCancel: () => void
  onOk: () => void
  show: boolean
})=> {
  return (
    <Box>
      <PWANotification
        onCancel={onCancel}
        onOk={onOk}
        show={show}
        title="Install App"
        okText="Install"
      >
        <p>
          Installing AmanHotel App uses almost no storage and provides a quick
          way to launch it from home screen.
        </p>
      </PWANotification>
    </Box>
  )
}
export default InstallBanner