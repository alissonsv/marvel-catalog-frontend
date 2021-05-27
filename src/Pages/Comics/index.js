import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Pagination, Skeleton } from '@material-ui/lab';
import { useAuth } from '../../hooks/useAuth';
import CharacterItem from '../../Components/characterItem';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '24px',
    paddingBottom: '24px',
    color: 'white',
  },
  comics: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  pagination: {
    marginTop: '10px',
    alignSelf: 'center',
    backgroundColor: theme.palette.background.light,
    padding: '10px',
    borderRadius: '10px',
  },
  skeleton: {
    margin: '10px',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.light,
  },
}));

export default function Comics() {
  const classes = useStyles();

  const auth = useAuth();

  const [comics, setComics] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getComics() {
    setLoading(true);

    const offset = (page - 1) * 20;
    const request = await fetch(`/api/comics?offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });
    const response = await request.json();

    if (response.code) {
      setComics(response.data.results);
      setNumPages(Math.ceil(response.data.total / 20));
    }

    setLoading(false);
  }

  useEffect(() => {
    getComics();
  }, [page]);

  function handlePageChange(_e, value) {
    setPage(value);
  }

  return (
    <Container className={classes.container}>
      <h1>Comics</h1>

      <div className={classes.comics}>
        {loading
          ? <Skeleton className={classes.skeleton} variant="rect" width={250} height={220} />
          : comics.map((comic) => (
            <CharacterItem
              id={comic.id}
              key={comic.id}
              name={comic.title}
              thumbnail={comic.thumbnail}
            />
          ))}
      </div>

      <Pagination
        className={classes.pagination}
        count={numPages}
        color="primary"
        page={page}
        onChange={handlePageChange}
      />
    </Container>
  );
}
