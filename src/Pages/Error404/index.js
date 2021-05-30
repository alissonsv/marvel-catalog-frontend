import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxHeight: 'calc(100vh - 200px)',
    maxWidth: '100vw',
  },
}));

export default function Error404() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <img className={classes.img} src="/not-found.png" alt="page not found" />
    </Container>
  );
}
