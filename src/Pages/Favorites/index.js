/* eslint-disable no-unused-vars */
import { Container, Divider, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import CardItem from '../../Components/CardItem';
import { useAuth } from '../../hooks/useAuth';
import {
  getFavoriteCharacters,
  getFavoriteComics,
  setFavoriteCharacters,
  setFavoriteComics,
} from '../../utils/favorites';

const useStyles = makeStyles((theme) => ({
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  skeleton: {
    margin: '10px',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.light,
  },
}));

export default function Favorites() {
  const classes = useStyles();
  const auth = useAuth();

  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [loadingComics, setLoadingComics] = useState(false);

  useEffect(async () => {
    const { token } = auth.user;
    setLoadingComics(true);
    setLoadingCharacters(true);

    setCharacters(await getFavoriteCharacters(token, true));
    setLoadingCharacters(false);

    setComics(await getFavoriteComics(token, true));
    setLoadingComics(false);
  }, []);

  async function handleCharacterFavoriteClick(id) {
    const charactersArray = characters.filter((character) => character.id !== id);
    const charactersIds = charactersArray.map((character) => character.id);

    const response = await setFavoriteCharacters(auth.user.token, charactersIds);
    if (JSON.stringify(response) === JSON.stringify(charactersIds)) {
      setCharacters(charactersArray);
    }
  }

  async function handleComicsFavoriteClick(id) {
    const comicsArray = comics.filter((comic) => comic.id !== id);
    const comicsIds = comicsArray.map((comic) => comic.id);

    const response = await setFavoriteComics(auth.user.token, comicsIds);
    if (JSON.stringify(response) === JSON.stringify(comicsIds)) {
      setComics(comicsArray);
    }
  }

  return (
    <Container className={classes.container}>
      <h1>Favorites</h1>

      <h2>Characters</h2>
      <Divider />
      <div className={classes.items}>
        {
          loadingCharacters
            ? <Skeleton className={classes.skeleton} variant="rect" width={250} height={220} />
            : characters.map((character) => (
              <CardItem
                id={character.id}
                name={character.name}
                thumbnail={character.thumbnail}
                key={character.id}
                checked={characters.some((item) => item.id === character.id)}
                favoriteClick={handleCharacterFavoriteClick}
              />
            ))
        }
      </div>

      <h2>Comics</h2>
      <Divider />

      <div className={classes.items}>
        {
          loadingComics
            ? <Skeleton className={classes.skeleton} variant="rect" width={250} height={220} />
            : comics.map((comic) => (
              <CardItem
                id={comic.id}
                name={comic.title}
                thumbnail={comic.thumbnail}
                key={comic.id}
                checked={comics.some((item) => item.id === comic.id)}
                favoriteClick={handleComicsFavoriteClick}
              />
            ))
        }
      </div>
    </Container>
  );
}
