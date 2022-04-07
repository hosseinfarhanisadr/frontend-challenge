import { TaskFormValues } from 'types';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/BorderColor';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().min(10).required(),
  status: yup.string().when('id', {
    is: (val: string) => Boolean(val),
    then: yup.string().required(),
  }),
});

type Props = {
  edit?: boolean;
  defaultValues: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
};

const TaskForm = ({ edit, defaultValues, onSubmit }: Props) => {
  const { reset, control, handleSubmit } = useForm<TaskFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSave = (values: TaskFormValues) => {
    onSubmit(values);

    if (!edit) {
      reset();
    }
  };

  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Typography variant="h5" component="p" sx={{ my: 1 }}>
        {`${edit ? 'Edit' : 'Add a new'} Task`}
      </Typography>

      <form onSubmit={handleSubmit(handleSave)}>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              variant="filled"
              label="Title"
              error={Boolean(error)}
              helperText={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              multiline
              rows={edit ? 12 : 4}
              margin="dense"
              variant="filled"
              label="Description"
              error={Boolean(error)}
              helperText={error?.message}
              {...field}
            />
          )}
        />

        <Stack direction="row" spacing={2} mt={1}>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            size="large"
            startIcon={edit ? <EditIcon /> : <AddIcon />}
          >
            {edit ? 'Edit' : 'Add'}
          </Button>

          {edit && (
            <Link href="/" passHref>
              <Button component="a" fullWidth variant="outlined" size="large">
                Cancel
              </Button>
            </Link>
          )}
        </Stack>
      </form>
    </Container>
  );
};

export default TaskForm;
