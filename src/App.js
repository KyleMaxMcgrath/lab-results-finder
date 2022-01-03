import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import Search from './Search';
import { BrowserRouter, Route, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import SearchBar from './SearchBar';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const doSearch = (term) => {
    setSearchTerm(oldTerm=>term);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Route exact path='/searchbar'>
          <SearchBar onSubmit={doSearch}/>
        </Route>
        <Route exact path='/'> 
          <Home />
        </Route>
        <Route exact path='/search'>
          <Search search_term={searchTerm}/>
        </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
