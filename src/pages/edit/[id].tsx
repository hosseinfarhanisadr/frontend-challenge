import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'store';
import { TaskFormValues } from 'types';
import Layout from 'components/Layout';
import TaskForm from 'components/TaskForm';
import Alert from '@mui/material/Alert';

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const task = useSelector((state) => {
    if (!id) {
      return;
    }
    return state.tasks.find((task) => task.id === id);
  });

  const dispatch = useDispatch();

  const handleEditTask = (values: TaskFormValues) => {
    dispatch({
      type: 'editTask',
      payload: values,
    });
  };

  return (
    <Layout title="Home">
      <Head>
        <title>Task Management - Edit Task</title>
      </Head>

      {task ? (
        <>
          <TaskForm edit onSubmit={handleEditTask} defaultValues={task} />
        </>
      ) : (
        <Alert severity="error">Not Found!</Alert>
      )}
    </Layout>
  );
};

export default Edit;
