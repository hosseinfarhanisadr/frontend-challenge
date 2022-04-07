import type { NextPage } from 'next';
import Head from 'next/head';
import { TaskFormValues } from 'types';
import Layout from 'components/Layout';
import TaskForm from 'components/TaskForm';
import { useDispatch } from 'store';
import Box from '@mui/material/Box';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const handleAddTask = (values: TaskFormValues) => {
    dispatch({
      type: 'addTask',
      payload: values,
    });
  };

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
        <TaskForm
          onSubmit={handleAddTask}
          defaultValues={{ title: '', description: '' }}
        />
      </Box>
    </Layout>
  );
};

export default Home;
