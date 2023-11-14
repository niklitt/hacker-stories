// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import * as React from 'react';
import './App.css'


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

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>My Hack3r Stories.</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories}/>
    </div>
  );
};

const Search = ({search, onSearch}) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input 
      id="search"
      type="text"
      value={search}
      onChange={onSearch}/>
  </div>
)

const List = ({list}) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item}/>
    ))}
  </ul>
);

const Item = ({item}) => (
  <li key={item.objectID}>
    <span>
      <a href={item.url}>{item.title} : </a>
    </span>
    <span>Author: {item.author}, </span>
    <span>Number of Comments: {item.num_comments}, </span>
    <span>Points: {item.points}</span>
  </li>
);

export default App
