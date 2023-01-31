import React from 'react'
import { Link } from 'react-router-dom';
import useStyles from './styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Product = ({ book, onAddToCart }) => {
  const classes = useStyles();
  return (

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link to={`product-view/${book.id}`} >
          <CardMedia
            component="img"
            height="140"
            image={book.image}
            alt="green iguana"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Author - {book.author}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ISBN - {book.isbn}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Genre - {book.genre}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Published - {book.published}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Product;