import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Product = ({ book, onAddToCart }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link to={`product-view/${book.id}`} >
        <CardActionArea>
          <CardMedia className={classes.media} image='https://media.istockphoto.com/id/1355271332/photo/christmas-gift-box-with-craft-decor-and-vintage-book.jpg?s=612x612&w=is&k=20&c=a8c__6eZYg4Xjqe1ZjNkX0PliAaRxILgCrR81z0Wjtc=' title={book.title} />
        </CardActionArea>
      </Link>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6">
            {book.title}
          </Typography>
          <Typography variant="h6" color="secondary">
            $<b>100</b>
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default Product;