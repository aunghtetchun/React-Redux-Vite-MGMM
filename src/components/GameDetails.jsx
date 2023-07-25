import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../actions/gameActions';

export default function GameDetails() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const popular_games = useSelector((state) => state.gameReducer.popular_games);
  if (popular_games){
    const game = popular_games.find((p) => p.slug === slug);
  }else{
  const game = useSelector((state) => state.gameReducer.game);
  }

  if (!game) {
    return <div>Game not found.</div>;
  }


  useEffect(() => {
    // Fetch the popular_games when the component mounts
    dispatch(fetchGameDetails(slug));
  }, [dispatch,slug]);

  return (
    <>
      {game && <span>{game.title}</span>}
    </>
  )
}
