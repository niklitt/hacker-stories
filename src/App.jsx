// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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

  return (
    <div>
      <h1>My Hack3r Stories.</h1>

      <Search />

      <hr />

      <List list={stories}/>
      
    </div>
  );
};

const Search = () => {
  // Now able to perform a task here
  const handleChange = (event) => {
    // Synthetic event
    console.log("Handling change to search bar:" + event);
    // Value of target (here: input HTML element)
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>
    </div>
  )
};

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item}/>
    ))}
  </ul>
);

const Item = (props) => (
  <li key={props.item.objectID}>
    <span>
      <a href={props.item.url}>{props.item.title} : </a>
    </span>
    <span>Author: {props.item.author}, </span>
    <span>Number of Comments: {props.item.num_comments}, </span>
    <span>Points: {props.item.points}</span>
  </li>
);

export default App
