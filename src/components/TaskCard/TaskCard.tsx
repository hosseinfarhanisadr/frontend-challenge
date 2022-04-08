import { Task } from 'types';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/BorderColor';

type Props = { task: Task };

const TaskCard = ({ task }: Props) => {
  return (
    <Card
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
  );
};

export default TaskCard;
