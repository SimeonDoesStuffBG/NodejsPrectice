import logo from './logo.svg';

import './App.css';
import './Components/Form.js'
import Form from './Components/Form.js';

function App() {
  
  var text= '';
  return (
    <div className="App">
      <h1>React test 1</h1>
      <Form onSubmitForm={query => text = query}/>
      
    </div>
  );
}

export default App;
