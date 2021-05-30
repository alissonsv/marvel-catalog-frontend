import {
  Card, CardActionArea, CardContent, CardMedia, Checkbox, makeStyles, Typography,
} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 250,
    margin: '10px',
    backgroundColor: '#c1c1c1',
  },
  media: {
    height: 140,
  },
});

export default function CardItem({
  id, name, thumbnail, checked, favoriteClick, type,
}) {
  const classes = useStyles();
  const history = useHistory();

  function handleRedirect() {
    if (type === 'character') {
      history.push(`/characters/${id}`);
    } else {
      history.push(`/comics/${id}`);
    }
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${thumbnail.path}.${thumbnail.extension}`}
          title={name}
          onClick={handleRedirect}
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            color="primary"
            checked={checked}
            onClick={() => favoriteClick(id)}
          />
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
