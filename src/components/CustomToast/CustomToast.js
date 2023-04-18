// import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import MuiAlert from '@mui/material/Alert';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export const Types = Object.freeze({
	SUCCESS: 'success',
	INFO: 'info',
	WARNING: 'warning',
	ERROR: 'error'
})
// export default function CustomToast({open, setOpen, type, children, ...props}) {
export default function CustomToast({toast, setToast, ...props}) {
    const { open, type, message } = toast
    console.log(type)
//   useEffect(() => {
//     if( type === Types.SUCCESS || type === Types.INFO || type === Types.WARNING || type === Types.ERROR ) {
//         setOpen(true);
//     }
//   }, [])

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({open: false, type: '', message: ''})
    // setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} {...props}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
  );
}