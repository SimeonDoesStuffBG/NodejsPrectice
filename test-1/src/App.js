import {useState} from 'react';
import './App.css';
import BookList from './Components/BookList';


function App() {
  const addr = "https://www.googleapis.com/books/v1/volumes?q=";
  const [search,setSearch] = useState("");
  const [books,setBooks] = useState([]);

  const onSubmit = async(e)=>{
    e.preventDefault();
    if(search.trim()===""){
      //window.alert("Enter Search item");
      return;
    }
    const res = await fetch(`${addr}${search.replace(' ','+')}`);
    const data = await res.json();
    console.log(data.items);
    setBooks([...data.items]);
    console.log(books);
  }
  
  return (
    <div className="App">
      <h1>React test 1</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)}/> <input type="submit"/>
      </form>
      <BookList books={books}/>
    </div>
  );
}

export default App;
