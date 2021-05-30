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

export default function CharacterDetail() {
  const classes = useStyles();
  const auth = useAuth();
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [charComics, setCharComics] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loadingComics, setLoadingComics] = useState(false);

  async function getCharComics() {
    setLoadingComics(true);

    const offset = (page - 1) * 20;
    const request = await fetch(`/api/characters/${id}/comics?offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });
    const response = await request.json();

    if (response.code === 200) {
      setCharComics(response.data.results);
      setNumPages(Math.ceil(response.data.total / 20));
    }
    setLoadingComics(false);
  }

  useEffect(async () => {
    const response = await fetch(`/api/characters/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });

    const responseJson = await response.json();
    if (responseJson) {
      setCharacter(responseJson.data.results[0]);
    }
  }, []);

  useEffect(() => {
    getCharComics();
  }, [page]);

  return (
    <Container className={classes.container}>
      { character && (
        <>
          <div className={classes.header}>
            <img
              className={classes.img}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={`${character.name}`}
            />
            <h1>{character.name}</h1>
          </div>

          <Divider />

          {
            character.description && (
              <div className={classes.description}>
                <h2>Description: </h2>
                <Typography variant="subtitle1">{character.description}</Typography>
              </div>
            )
          }

          {
            charComics && (
              <div className={classes.comics}>

                <h2>Comics:</h2>

                {
                  loadingComics
                    ? <Skeleton className={classes.skeleton} variant="text" width={400} />
                    : charComics.map((comic) => (
                      <li key={comic.id}><LinkUI component={Link} to={`/comics/${comic.id}`}>{comic.title}</LinkUI></li>
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
