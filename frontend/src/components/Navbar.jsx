import React from 'react'
import navstyles from '../styles/navstyles.module.css'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const loc = useLocation()
  let txt, path; 

  if (loc.pathname === '/login') {
    txt = 'Register';
    path = '/register';
  } else if (loc.pathname === '/register') {
    txt = 'Login';
    path = '/login';
  } else {
    txt = 'Logout';
    path = '/logout';
  }

  return (
    <ul className={navstyles.navi}>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/list'>List</NavLink></li>
      <li><NavLink to={path}>{txt}</NavLink></li>
    </ul>
  )
}

export default Navbar
