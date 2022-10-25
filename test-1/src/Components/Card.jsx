import React from 'react'

const Card = ({book}) => {
  return (
    <div className="Book">
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
        <div><h3>{book.volumeInfo.title}</h3> {book.volumeInfo.publishedDate}</div>
        <div><b>Written by:</b> {book.volumeInfo.authors.toString().replace(/,/g,", ")}</div>
        <div><b>Cattegories:</b> {book.volumeInfo.categories.toString().replace(/,/g,", ")}</div>
        <div><b>Published by:</b> {book.volumeInfo.publisher}</div>
    </div>
  )
}

export default Card