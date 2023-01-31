import React, { useEffect, useRef, useState } from "react";
import { Grid, InputAdornment, Input } from "@material-ui/core";
import Pagination from '@mui/material/Pagination';
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import ApiIndex from "../../api/index";

const Products = () => {
  const classes = useStyles();
  const [state, setState] = useState({ title: '', isbn: '', genre: '', author: '', published: '' });

  const scrollRef = useRef(null)

  const [searchTerm, setSearchTerm] = useState("");

  const [books, setBooks] = useState([]);

  const [page, setPage] = React.useState(1);

  const [totalPages, setTotalPages] = React.useState(9);



  const {
    title,
    isbn,
    genre,
    author,
    published
  } = state

  useEffect(() => {
    fetchData();
  }, []);

  function calculateTotalPages(count) {
    if (count) {
      if (count % 12 != 0) {
        setTotalPages(Math.floor(count / 12) + 1);
      } else {
        setTotalPages(Math.floor(count / 12));
      }
    } else {
      setTotalPages(0);
    }
  }

  async function fetchData() {
    let response = await ApiIndex.BookApi.getBooks(state, page);
    calculateTotalPages(response.data.data.total);
    const updatedBookList = response.data.data.data
    setBooks(updatedBookList);
  }

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchData();
    executeScroll();
  };

  const onSearch = async () => {
    fetchData();
  }

  const onReset = async () => {
    setState({ title: '', isbn: '', genre: '', author: '', published: '' })
    fetchData();
  }

  const executeScroll = () => scrollRef.current.scrollIntoView()

  return (
    <main className={classes.content} >
      <Card>
        <Card.Header>Search & Filter Books</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Form.Control size="lg" type="text" name="title" value={state.title} onChange={handleChange} placeholder="Title" />
              </Col>
              <Col>
                <Form.Control size="lg" type="text" name="isbn" value={state.isbn} onChange={handleChange} placeholder="ISBN" />
              </Col>
              <Col>
                <Form.Select size="lg" name="genre" value={state.genre} onChange={handleChange} aria-label="Default select example">
                  <option value=''>Select Genre</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Laborum">Laborum</option>
                  <option value="Libero">Libero</option>
                </Form.Select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Control size="lg" type="text" name="author" value={state.author} onChange={handleChange} placeholder="Author" />
              </Col>
              <Col>
                <Form.Control size="lg" type="date" name="published" value={state.published} onChange={handleChange} placeholder="Publication Date" />
              </Col>
              <Col>

              </Col>
            </Row>
            <br />

            <Row>
              <Col md={2}>
                <Button variant="contained" color="success" onClick={onSearch}>Search</Button>

              </Col>

              <Col md={2}>
                <Button variant="outlined" color="primary" onClick={onReset}>Reset</Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>

      <div className={classes.searchs}>
        <Input
          className={classes.searchb}
          type="text"
          placeholder="Quick Title Search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>

      <Grid className={classes.content} container justify="center" spacing={5} ref={scrollRef}>
        {books
          .filter((book) => {
            if (searchTerm === "") {
              return book;
            } else if (
              book.title
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return book;
            }
          })
          .map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} id="pro">
              <Product book={book} />
            </Grid>
          ))}
      </Grid>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <Pagination count={totalPages} page={page} onChange={handlePageChange} size="large" />
          </Col>

        </Row>
      </Container>
    </main>
  );
};

export default Products;
