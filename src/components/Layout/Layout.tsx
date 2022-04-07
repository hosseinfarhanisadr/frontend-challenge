import { ReactNode } from 'react';
import Header from './Header';
import Box from '@mui/material/Box';

type Props = { title: string; children: ReactNode };

const Layout = ({ title, children }: Props) => {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1} minHeight="100vh">
      <Header title={title} />
      <Box component="main" display="flex" flexDirection="column" flexGrow={1}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
