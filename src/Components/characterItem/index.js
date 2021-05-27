import {
  Card, CardActionArea, CardContent, CardMedia, Checkbox, makeStyles, Typography,
} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

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

export default function characterItem({
  id, name, thumbnail, checked, favoriteClick,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${thumbnail.path}.${thumbnail.extension}`}
          title={name}
          onClick={() => alert(id)}
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
