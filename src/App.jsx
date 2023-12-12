// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import * as React from 'react';
import './App.css'

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  React.useEffect( () => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>My Hack3r Stories.</h1>
      <InputWithLabel
        id="search"
        value = {searchTerm}
        isFocused
        onInputChange = {handleSearch} 
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories}/>
    </div>
  );
};

//No idea wtf &nbsp is used for exactly
//autoFocus is the same as autoFocus={true}
const InputWithLabel = ({id, value, type = 'text', onInputChange, isFocused, children}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if(isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp; /* wtf is this?????? *\
      <input 
        id={id}
        type={type}
        value={value}
        autoFocus = {isFocused}
        onChange={onInputChange}/>
    </>
  );
};


const List = ({list}) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item}/>
    ))}
  </ul>
);

const Item = ({item}) => (
  <li>
    <span>
      <a href={item.url}>{item.title} : </a>
    </span>
    <span>Author: {item.author}, </span>
    <span>Number of Comments: {item.num_comments}, </span>
    <span>Points: {item.points}</span>
  </li>
);

export default App
