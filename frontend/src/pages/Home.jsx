import React, { useState } from 'react'
import axios from 'axios'
import api from '../api'
import homestyles from '../styles/homestyles.module.css'

const Home = () => {
  const [searchedAnime, setSearchedAnime] = useState([])
  const [query, setQuery] = useState('')
  const [formdata, setFormData] = useState({watched: false})
  const [showModal, setShowModal] = useState(false)

  const getSearchItems = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = () => {
    if (query !== '') {
      axios.get(`https://api.jikan.moe/v4/anime?q=${query}&sfw=true&limit=10`)
        .then(res => {
          console.log(res.data)
          setSearchedAnime(res.data.data)
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }

  const addAni = (anime) => {
    setFormData({jikanId: anime.mal_id, title: anime.title, description: anime.synopsis, img_url: anime.images.jpg.image_url, rating: 1, watched: false})
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)
    api.post('/api/anime/', formdata).then((res) => {
      if (res.status === 201) {
        alert('anime added')
      } else alert('could not add anime ')
    }).catch((error) => console.log(error))
  }

  return (
    <>
      <h1 className={homestyles.title}>Anime Tome</h1>

      <div className={homestyles.container}>
        <input type='text' onKeyDown={(e) => { if(e.key === 'Enter') {handleSearch()} }} className={homestyles.searchbar} onChange={getSearchItems} placeholder='Search...'/>
      </div>

      <button className={homestyles.btn} onClick={handleSearch}>Search</button>

      {searchedAnime.length > 0 && (
  <ul className={homestyles.searchItems}>
    {searchedAnime.map((anime, index) => (
      <div onClick={() => addAni(anime)} key={index} className={homestyles.imgdiv}>
        <img className={homestyles.img} src={anime.images.jpg.image_url} alt='anime' />
        <li className={homestyles.listitem} key={index}>{anime.title}</li>
        <button className={homestyles.addbtn}>Add</button>
      </div>
    ))}
  </ul>
)}

  {showModal && (
    <div className={homestyles.overlay} onClick={() => setShowModal(false)}>
      <form className={homestyles.modal} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <label className={homestyles.rating} htmlFor='rating'>Rating
          <select className={homestyles.rating} value={formdata.rating} onChange={(e) => setFormData({ ...formdata, rating: e.target.value })}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
        </label>

        <label className={homestyles.rating} htmlFor='watched'>Watched
          <input className={homestyles.box} type='checkbox' checked={formdata.watched} onChange={(e) => setFormData({ ...formdata, watched: e.target.checked })}/>
        </label>

        <button className={homestyles.submitbtn} type='submit'>Submit</button>
      </form>
    </div>
  )}

    </>
  )
}

export default Home




