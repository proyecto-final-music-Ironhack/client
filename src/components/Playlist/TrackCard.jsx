import { Button, Image, Spinner } from '@chakra-ui/react'
import emptyHeart from '../../images/empy-heart.png'
import heart from '../../images/heart.png'
import playlistService from '../../services/playlist.service'
import { useState, useEffect } from 'react'

function TrackCard({ trackName, likes, image, artists, _id, userId }) {
  const [like, setLike] = useState(likes?.includes(userId) ?? false)
  const [showLikes, setShowLikes] = useState(likes?.length ?? 0)
  const [artistList, setArtistList] = useState('')

  useEffect(() => {
    if (artists) {
      setArtistList(artists.join(', '))
    }
  }, [artists])

  const handleLike = async () => {
    try {
      await playlistService.getTrackLike(_id)
      setLike(true)
      setShowLikes(num => num + 1)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDislike = async () => {
    try {
      await playlistService.getTrackDislike(_id)
      setLike(false)
      setShowLikes(num => (num > 0 ? num - 1 : 0))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <img src={image} alt='Track image' />
      <p>{trackName}</p>
      <p>{artistList || <Spinner />}</p>
      <p>{showLikes >= 0 ? showLikes : <Spinner />}</p>

      {like ? (
        <Button className='like-button' type='button' onClick={handleDislike}>
          <Image w='18px' src={heart} />
        </Button>
      ) : (
        <Button className='dislike-button' type='button' onClick={handleLike}>
          <Image w='18px' src={emptyHeart} />
        </Button>
      )}

      <hr />
    </>
  )
}

export default TrackCard