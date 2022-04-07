import { Fragment } from 'react';
import { History } from 'types';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';

type Props = { history: History[] };

const TaskHistory = ({ history = [] }: Props) => {
  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={
          <ListSubheader disableSticky sx={{ fontSize: 18 }}>
            History
          </ListSubheader>
        }
      >
        {history.map((change, index) => (
          <Fragment key={change.id}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      variant="body1"
                      color="text.primary"
                    >
                      {`${change.subject} was updated.`}
                    </Typography>
                    <Typography
                      sx={{ display: 'inline' }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {` — ${change.updatedAt}`}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: 'inline',
                        textDecorationLine: 'line-through',
                      }}
                    >
                      {change.old}
                    </Typography>

                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {` → ${change.new}`}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index !== history.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </Fragment>
        ))}
      </List>
    </Container>
  );
};

export default TaskHistory;
