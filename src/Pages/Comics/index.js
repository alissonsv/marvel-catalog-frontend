import {
  Container, IconButton, InputBase, Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import { Pagination, Skeleton } from '@material-ui/lab';
import { useAuth } from '../../hooks/useAuth';
import CardItem from '../../Components/CardItem';
import { getFavoriteComics, setFavoriteComics } from '../../utils/favorites';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  formSearch: {
    display: 'flex',
    maxWidth: '250px',
    margin: '10px',
    backgroundColor: '#333',
  },
  searchInput: {
    marginLeft: '5px',
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
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getComics() {
    setLoading(true);

    const offset = (page - 1) * 20;
    const request = await fetch(`/api/comics?offset=${offset}&titleStartsWith=${search}`, {
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

  useEffect(async () => {
    const favoriteComics = await getFavoriteComics(auth.user.token);
    setFavorites(favoriteComics);
  }, []);

  useEffect(() => {
    getComics();
  }, [page]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    getComics();
  }

  async function handleFavoriteClick(id) {
    let favoritesCopy = [...favorites];

    if (favoritesCopy.includes(id)) {
      favoritesCopy = favoritesCopy.filter((favorite) => favorite !== id);
    } else {
      favoritesCopy = [...favoritesCopy, id];
    }

    favoritesCopy = await setFavoriteComics(auth.user.token, favoritesCopy);
    setFavorites(favoritesCopy);
  }

  function handlePageChange(_e, value) {
    setPage(value);
  }

  return (
    <Container className={classes.container}>
      <h1>Comics</h1>

      <Paper component="form" className={classes.formSearch} onSubmit={handleSearchSubmit}>
        <InputBase
          className={classes.searchInput}
          name="name"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div className={classes.comics}>
        {loading
          ? <Skeleton className={classes.skeleton} variant="rect" width={250} height={220} />
          : comics.map((comic) => (
            <CardItem
              id={comic.id}
              key={comic.id}
              name={comic.title}
              thumbnail={comic.thumbnail}
              checked={favorites.includes(comic.id)}
              favoriteClick={handleFavoriteClick}
              type="comic"
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
