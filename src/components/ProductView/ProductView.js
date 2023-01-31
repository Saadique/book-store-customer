import React from 'react'
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import './style.css'
import ApiIndex from "../../api/index";


const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {

  const [book, setBook] = useState({});

  const fetchBook = async (id) => {
    let response = await ApiIndex.BookApi.getBook(id);
    const updatedBook = response.data.data;
    console.log(updatedBook)
    setBook(updatedBook);

  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchBook(id[2]);
  }, []);

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={book.image} alt={book.title} width={80} height={500} />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2"><b>{book.title}</b></Typography>
          <hr />
          <Typography variant="p" dangerouslySetInnerHTML={createMarkup(book.description)} />
          <Typography variant="h3" color="secondary" >Price: <b> {book.price} </b> </Typography>
          <br />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button size="large" className="custom-button" component={Link} to='/' >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
