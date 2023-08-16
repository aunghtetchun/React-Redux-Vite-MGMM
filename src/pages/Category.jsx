import { useRef, useState } from "react";
import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { fetchCategories, setCurrentStatus } from "../actions/gameActions";
import LoadingCategory from "../components/LoadingCategory";
import TopNav from "../components/TopNav";

export function Category() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [loading, setLoading]=useState(false);
  const categories = useSelector((state) => state.gameReducer.categories);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());  
      setLoading(true);
    }else{
        setLoading(false);
    }
  }, [dispatch, categories]);

  // useEffect(() => {
  //   // console.log("hello world!");
  //   dispatch(setCurrentStatus('category'));
  //   dispatch(setCurrentUrl('/category'));
  // }, [dispatch]);

  const goAllGames = () => {
    dispatch(setCurrentStatus('games'));
    navigate('/games');
  }

  const goGamesByCategory= (category_id)=>{
    dispatch(setCurrentStatus('category'));
    navigate('/games/category/'+category_id);

  }
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
      navigate('/games')
    } else if (deltaX > threshold) {
      navigate('/')
    }
  };


  return (
    <>
        <TopNav position={'/category'}/>
      {loading ? (
        <LoadingCategory />
      ) : (
        <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="d-flex col-12 flex-wrap px-0 justify-content-center">
        <div className="col-6 p-1">
          <button onClick={goAllGames}
            className="btn rounded-0 btn-danger  w-100 p-2"
          >
            ဂိမ်းအားလုံး 
          </button>
        </div>
        {categories &&
          categories.map((category) => (
            <div className="col-6 p-1" key={category.id}>
              <button onClick={()=>goGamesByCategory(category.id)} 
                className="btn rounded-0 btn-outline-danger  w-100 p-2"
              >
                {category.title}  <span className="text-dark"> ( { category.count } ) </span> 
              </button>
            </div>
          ))}
      </div>
      )}
        <div className="col-12 shadow my-2">
      <img src="https://i.ibb.co/4fmcGCS/367501504-334105872378221-4151896815920128807-n.jpg" className="w-100" alt="" />
      <Badge  bg="dark" className="fw-bold px-4 py-2" text="light" >
        ကြော်ငြာ
      </Badge>
                 
                </div>
    </>
  );
}
