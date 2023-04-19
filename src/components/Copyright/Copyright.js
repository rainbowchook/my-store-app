import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://prismatic-bonbon-51d1ae.netlify.app">
          Blue Bug Boutique
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright