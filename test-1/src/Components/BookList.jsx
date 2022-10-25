import {React} from 'react'
import Card from './Card'


const BookList = ({books}) => {
  
return (
    <div>{books.map(book=><Card key={book.id} book={book}/>)}</div>
)
}

export default BookList