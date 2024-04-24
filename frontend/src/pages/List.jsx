import React, {useState, useEffect} from 'react'
import api from '../api'
import liststyles from '../styles/liststyles.module.css'
import Loading from '../components/Loading'

const List = () => {
    const [userList, setUserList] = useState([])
    const [formdata, setFormData] = useState({watched: false})
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
    api.get('/api/anime/').then((res) => {
      setUserList(res.data)
      setIsLoading(false)
    }).catch((error) => {
      console.error('error: ', error)
      setIsLoading(false)
    })
  }, [])

  const delAni = (anime) => {
    api.delete(`/api/anime/delete/${anime.id}/`).then(() => {
      setUserList(userList.filter(e => e.id !== anime.id))
    })
  }

  const editAni = (anime) => {
    setFormData(anime)
    setEdit(true)
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (edit) {
      api.patch(`/api/anime/${formdata.id}/`, formdata).then((res) => {
        if(res.status === 200) {
          setUserList(userList.map(anime => anime.jikanId === formdata.jikanId ? res.data : anime))
          setShowModal(false)
        } else alert('could not edit anime')
      }).catch((error) => console.error(error))
    } else {
    api.post('/api/anime/', formdata).then((res) => {
      if (res.status === 201) {
        setUserList([...userList, res.data])
      } else alert('could not add anime ')
    }).catch((error) => console.error(error))
  }
  setEdit(false)
  setShowModal(false)
}

  return (
    <>


    {isLoading ? <Loading /> : (
      <>
      <h1 className={liststyles.title}>Anime list</h1>
    <div className={liststyles.anime}>
      {userList.map((anime, index) => (
      <div className={liststyles.inneranime} key={index}>
        <h2>{anime.title}</h2>
        <img src={anime.img_url} alt='anime'></img>
        <p className={liststyles.synopsis}>{anime.description}</p>
        <p>Rated: {anime.rating}</p>
        <p>Completed: {anime.watched ? 'Yes' : 'No' }</p>
        <p>Added at: {new Date(anime.addedAt).toLocaleDateString('en-US')}</p>
        <button className={liststyles.editbtn} onClick={() => editAni(anime)}>Edit</button>
        <button className={liststyles.delbtn} onClick={() => delAni(anime)}>Delete</button>
      </div>
    ))}
    </div >
    </>
  
    )}

    {showModal && (
    <div className={liststyles.overlay} onClick={() => setShowModal(false)}>
      <form className={liststyles.modal} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <label className={liststyles.rating} htmlFor='rating'>Rating
          <select className={liststyles.rating} value={formdata.rating} onChange={(e) => setFormData({ ...formdata, rating: e.target.value })}>
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

        <label className={liststyles.rating} htmlFor='watched'>Watched
          <input className={liststyles.box} type='checkbox' checked={formdata.watched} onChange={(e) => setFormData({ ...formdata, watched: e.target.checked })}/>
        </label>
        
        <button className={liststyles.submitbtn} type='submit'>Submit</button>
      </form>
    </div>
  )}
    </>
  )
}

export default List