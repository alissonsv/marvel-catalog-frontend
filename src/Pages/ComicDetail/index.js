import {
  Container, Divider, makeStyles, Typography, Link as LinkUI,
} from '@material-ui/core';
import { Pagination, Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    maxHeight: '250px',
    alignSelf: 'center',
  },
  comics: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  skeleton: {
    backgroundColor: theme.palette.background.light,
  },
  pagination: {
    marginTop: '10px',
    backgroundColor: theme.palette.background.light,
    borderRadius: '10px',
  },
}));

export default function ComicDetail() {
  const classes = useStyles();
  const auth = useAuth();
  const host = process.env.REACT_APP_API_HOST;
  const { id } = useParams();

  const [comic, setComic] = useState(null);
  const [comicCharacters, setComicCharacters] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  async function getComicCharacters() {
    setLoadingCharacters(true);

    const offset = (page - 1) * 20;
    const request = await fetch(`${host}/api/comics/${id}/characters?offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });
    const response = await request.json();

    if (response.code === 200) {
      setComicCharacters(response.data.results);
      setNumPages(Math.ceil(response.data.total / 20));
    }
    setLoadingCharacters(false);
  }

  useEffect(async () => {
    const response = await fetch(`${host}/api/comics/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });

    const responseJson = await response.json();
    if (responseJson) {
      setComic(responseJson.data.results[0]);
    }
  }, []);

  useEffect(() => {
    getComicCharacters();
  }, [page]);

  return (
    <Container className={classes.container}>
      { comic && (
        <>
          <div className={classes.header}>
            <img
              className={classes.img}
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={`${comic.title}`}
            />
            <h1>{comic.title}</h1>
          </div>

          <Divider />

          {
            comic.description && (
              <div className={classes.description}>
                <h2>Description: </h2>
                <Typography variant="subtitle1">{comic.description}</Typography>
              </div>
            )
          }

          {
            comicCharacters.length > 0 && (
              <div className={classes.comics}>

                <h2>Comics:</h2>

                {
                  loadingCharacters
                    ? <Skeleton className={classes.skeleton} variant="text" width={400} />
                    : comicCharacters.map((character) => (
                      <li key={comic.id}><LinkUI component={Link} to={`/characters/${character.id}`}>{character.name}</LinkUI></li>
                    ))
                }

                <Pagination
                  className={classes.pagination}
                  count={numPages}
                  color="primary"
                  page={page}
                  onChange={(_e, value) => setPage(value)}
                />
              </div>
            )
          }
        </>
      )}
    </Container>
  );
}
