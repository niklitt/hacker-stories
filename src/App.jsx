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

const initialStories = [
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

const getAsyncStories = () =>
  new Promise((resolve) => 
    setTimeout(
      () => resolve({ data: { stories: initialStories}}), 2000
    )
  )

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload;
    case 'REMOVE_STORIES':
      return state.filter(
        (story) => action.payload.objectID !== story.objectID
      );
    default:
      throw new Error();
  }
};

const App = () => {

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories().then(result => {
      dispatchStories({
        type: 'SET_STORIES',
        payload: result.data.stories,
      })
      setIsLoading(false);
    }).catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORIES',
      payload: item,
    })
  }

  React.useEffect( () => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // In error handling block, if false it skips, if true it returns what's after the &&. better than ternary operator
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

      {isError && <p>Something went wrong with gathering data....??</p>} 

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
      )}
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


const List = ({list, onRemoveItem}) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
    ))}
  </ul>
);

const Item = ({item, onRemoveItem}) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title} : </a>
      </span>
      <span>Author: {item.author}, </span>
      <span>Number of Comments: {item.num_comments}, </span>
      <span>Points: {item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  )
};

export default App
