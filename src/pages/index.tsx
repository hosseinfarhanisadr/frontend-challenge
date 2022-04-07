import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from 'components/Layout';
import Box from '@mui/material/Box';

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Head>
        <title>Task Management - List</title>
      </Head>

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        position="relative"
      >
        Home
      </Box>
    </Layout>
  );
};

export default Home;
