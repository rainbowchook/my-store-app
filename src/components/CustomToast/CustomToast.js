import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Types = Object.freeze({
	SUCCESS: 'success',
	INFO: 'info',
	WARNING: 'warning',
	ERROR: 'error'
})

export default function CustomToast({toast, setToast, ...props}) {
    const { open, type, message } = toast

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({open: false, type: '', message: ''})
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} {...props}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
  );
}