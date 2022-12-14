import React,{useState,useEffect} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import {Box,Paper} from '@mui/material';
import { dmSansFont } from '../../../utils/nextFont';
import formatDate from '../../../utils/formatDate';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function LinearProgressWithLabel(props:any) {
    const displayReviewData = () => {
        if (props.booking.created_at !== props.booking.updated_at) {
          return <>
          {formatDate(props.booking?.updated_at || '')}
          </>;
        }
        return <>
        {formatDate(props.booking?.created_at || '')}
        </>;
    };
    return (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'space-between',marginBottom:'10px' }}>
        <h3 className={dmSansFont.className}>Booking {props.booking.status} on <span style={{color:'rgb(92, 152, 242)',fontWeight:'600'}}>{displayReviewData()}</span></h3>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" sx={{height: 7, borderRadius: 5,}} {...props} />
     </Box>
        </>
   
    );
}

const steps = [
    'Requested',
    'Accepted',
    'Confirmed',
    'To review',
    'Completed'
];

const BookingStatusBar = ({booking}:any) => {
    const [progress, setProgress] = useState(0);

    useEffect(()=>{
      if(booking.status === 'requested'){
        setProgress(20)
      } else if(booking.status === 'accepted'){
        setProgress(40)
      } else if(booking.status === 'confirmed'){
        setProgress(60)
      } else if(booking.status === 'to review'){
        setProgress(80)
      } else if(booking.status === 'completed'){
        setProgress(100)
      } else if(booking.status === 'denied'){
        setProgress(0)
      }
    },[booking.status])

    const activeStep=(status:string)=>{
       switch (status) {
        case 'requested':
            return 1
            break;
        case 'accepted':
            return 2
            break;
        case 'confirmed':
            return 3
            break;
        case 'to review':
            return 4
            break;
        case 'completed':
            return 5
            break;
       
        default: 1
            break;
       }
    }

    return (
        <div >
         <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} booking={booking} color={booking.status ==='denied'? 'error':'primary'} />

          <Box sx={{ width: '100%' }} className='booking_status_list'>
          <Stepper activeStep={activeStep(booking.status)} alternativeLabel>
            {steps.map((label) => (
            <Step key={label} 
              sx={{
                '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel':
                  {
                    marginTop: '8px',
                    fontSize:{sm:'',xs:'11px'}
                  },
                  paddingLeft:'0',
                  paddingRight:'0'
              }}
            >
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
          </Box>

        </Box>
        </div>
    );
};

export default BookingStatusBar;