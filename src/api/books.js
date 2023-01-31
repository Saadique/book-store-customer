import axios from "../axios"

const getBooks = (params, page) => {
    return axios.get(`books`,{
        params:{
            'title': params.title,
            'isbn': params.isbn,
            'genre': params.genre,
            'author': params.author,
            'published': params.published,
            'page': page
        }
    });
}

const getBook = (id) => {
    return axios.get(`books/${id}`);
}

export default {
    getBooks: getBooks,
    getBook: getBook
};