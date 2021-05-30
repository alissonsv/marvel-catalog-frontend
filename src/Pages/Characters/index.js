import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Pagination, Skeleton } from '@material-ui/lab';
import { useAuth } from '../../hooks/useAuth';
import CardItem from '../../Components/CardItem';
import { getFavoriteCharacters, setFavoriteCharacters } from '../../utils/favorites';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  characters: {
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

export default function Characters() {
  const classes = useStyles();

  const auth = useAuth();

  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getCharacters() {
    setLoading(true);

    const offset = (page - 1) * 20;
    const request = await fetch(`/api/characters?offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });
    const response = await request.json();

    if (response.code) {
      setCharacters(response.data.results);
      setNumPages(Math.ceil(response.data.total / 20));
    }

    setLoading(false);
  }

  useEffect(() => {
    getCharacters();
  }, [page]);

  useEffect(async () => {
    const favoriteCharacters = await getFavoriteCharacters(auth.user.token);
    setFavorites(favoriteCharacters);
  }, []);

  async function handleFavoriteClick(id) {
    let favoritesCopy = [...favorites];

    if (favoritesCopy.includes(id)) {
      favoritesCopy = favoritesCopy.filter((favorite) => favorite !== id);
    } else {
      favoritesCopy = [...favoritesCopy, id];
    }

    favoritesCopy = await setFavoriteCharacters(auth.user.token, favoritesCopy);
    setFavorites(favoritesCopy);
  }

  function handlePageChange(_e, value) {
    setPage(value);
  }

  return (
    <Container className={classes.container}>
      <h1>Characters</h1>

      <div className={classes.characters}>
        {loading
          ? <Skeleton className={classes.skeleton} variant="rect" width={250} height={220} />
          : characters.map((character) => (
            <CardItem
              id={character.id}
              key={character.id}
              name={character.name}
              thumbnail={character.thumbnail}
              checked={favorites.includes(character.id)}
              favoriteClick={handleFavoriteClick}
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
