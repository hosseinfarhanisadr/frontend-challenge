import { Task } from 'types';
import { useSelector } from 'store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/BorderColor';
import Link from 'next/link';

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
        <Box
          display="flex"
          flexWrap="wrap"
          flexGrow={1}
          sx={{ height: '100%', overflowY: 'auto' }}
        >
          {tasks.map((task: Task) => (
            <Card
              key={task.id}
              sx={{
                m: 2,
                width: 300,
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                  color="text.secondary"
                >
                  {task.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Chip
                  color="primary"
                  variant="filled"
                  sx={{ borderRadius: 2, minWidth: 88 }}
                  label={task.status}
                />

                <Link href={`/edit/${task.id}`} passHref>
                  <IconButton component="a" aria-label="delete" size="large">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Tasks;
