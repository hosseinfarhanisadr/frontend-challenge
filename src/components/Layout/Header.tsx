// TODO: import theme directly
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type Props = { title: string };

const Header = ({ title }: Props) => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6">{`Task Management > ${title}`}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
