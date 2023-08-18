import { fetchPopularGames, setCurrentUrl } from "../actions/gameActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TopNav from "../components/TopNav";
import CardItem from "../components/CardItem";
import LoadingCard from "../components/LoadingCard";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

export default function PopularGames() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const popular_games = useSelector((state) => state.gameReducer.popular_games);
  const prevScrollPosition = useSelector((state) => state.gameReducer.scroll_position_game);


  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (!popular_games || popular_games.length === 0) {
        dispatch(fetchPopularGames());
    }
  }, [dispatch,popular_games]);

  useEffect(() => {
    dispatch(setCurrentUrl('/'));
  }, [dispatch]);
  

  useEffect(() => {
    // Restore the scroll position when coming back to the component
    const targetElement = document.getElementById(prevScrollPosition);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'auto', // Use 'auto' for instant scrolling without animation
        block: 'start',     // Scroll to the top of the element
        inline: 'nearest'   // Scroll horizontally to the nearest edge
      });
    }
  }, [prevScrollPosition]);

  const navigate=useNavigate();

  const touchStartX = useRef(0);
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartX.current;

    // Determine the threshold for considering it a left slide (you can adjust this value)
    const threshold = 150;

    if (deltaX < -threshold) {
      console.log("Sliding left");
      navigate('/category')
    }
  };

  const goUrl=(url)=>{
    window.location.href = url;
  }
  
  if (!popular_games){
    return <LoadingCard count={12}/>
  }
  

  
  return (
    <>
    <TopNav position={'/'}/>
    <div className="col-12 col-md-7 mx-auto py-2 " onClick={()=>goUrl('https://www.facebook.com/KVCMyanmar?mibextid=ZbWKwL')}>
     
                  <img src="https://i.ibb.co/PN9sKH7/367495909-1243618689655999-7963063728003866697-n.jpg" className="w-100" alt="" />
                  <Badge  bg="dark" className="fw-bold  px-4 py-2" text="light" >
        ကြော်ငြာ
      </Badge>
                </div>
     {loading ? <LoadingCard count={12}/>
    : 
      <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center align-items-center">
        {/* <h3 className="col-12 ps-2">Most Popular Games</h3> */}
        {popular_games &&
          popular_games.map((game) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={game.id}
            >
              <CardItem game={game} />
            </div>
          ))}
      </div>
}
    </>
  );
}
