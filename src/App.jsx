// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const list = [
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

const App = () => (

  // const welcome = {
  //   greeting: 'Howdy',
  //   title: 'World.',
  // }

  // function getTitle(title) {
  //   return title;
  // }
    <div>
      <h1>My Hack3r Stories.</h1>

      <Search />

      <hr />

      <List />
      <List />
      
    </div>
)

const Search = () => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" />
  </div>
);

const List = () => (
  <ul>
    {list.map((item) => (
        <li key={item.objectID}>
          <span>
            <a href={item.url}>{item.title} : </a>
          </span>
          <span>Author: {item.author}, </span>
          <span>Number of Comments: {item.num_comments}, </span>
          <span>Points: {item.points}</span>
        </li>
      ))}
  </ul>
);

export default App
