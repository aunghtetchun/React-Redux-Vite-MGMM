import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, setCurrentStatus, setCurrentUrl } from "../actions/gameActions";
import LoadingCategory from "../components/LoadingCategory";
import TopNav from "../components/TopNav";

export function Category() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    // console.log("hello world!");
    dispatch(setCurrentStatus('games'));
    dispatch(setCurrentUrl('/category'));
  }, [dispatch]);

  return (
    <>
        <TopNav position={'/category'}/>
      {loading ? (
        <LoadingCategory />
      ) : (
        <div className="d-flex col-12 flex-wrap px-0 justify-content-center">
        <div className="col-6 p-1">
          <Link to={`/games/`} 
            className="btn rounded-0 btn-outline-danger  w-100 p-2"
          >
            ဂိမ်းအားလုံး
          </Link>
        </div>
        {categories &&
          categories.map((category) => (
            <div className="col-6 p-1" key={category.id}>
              <Link to={`/games/category/${category.id}`} 
                className="btn rounded-0 btn-outline-danger  w-100 p-2"
              >
                {category.title}
              </Link>
            </div>
          ))}
      </div>
      )}
    </>
  );
}
