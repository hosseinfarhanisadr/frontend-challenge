import { Task } from 'types';
import { useSelector } from 'store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TaskCard from 'components/TaskCard';

const Tasks = () => {
  const tasks: Task[] = useSelector((state) => state.tasks);

  return (
    <>
      <Box
        sx={{
          p: 3,
          borderRadius: '30px 30px 0 0',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          height: 100,
        }}
      >
        <Typography variant="h6">Tasks</Typography>
      </Box>

      <Box
        flexGrow={1}
        sx={{
          px: 3,
          py: 4,
          mt: -3,
          borderRadius: '30px 30px 0 0',
          backgroundColor: 'primary.light',
          alignItems: 'flex-start',
          height: 0,
        }}
      >
        {tasks.length > 0 ? (
          <Box
            display="flex"
            flexWrap="wrap"
            flexGrow={1}
            sx={{ height: '100%', overflowY: 'auto' }}
          >
            {tasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h6">You have nothing to do.</Typography>
            <Typography variant="h6">Go get some sleep.</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Tasks;
