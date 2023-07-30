import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories, setCategory, setCurrentUrl } from "../actions/gameActions";
import LoadingCategory from "../components/LoadingCategory";
import TopNav from "../components/TopNav";

export function Category() {
  const dispatch = useDispatch();
  const [loading, setLoading]=useState(false);
  const categories = useSelector((state) => state.gameReducer.categories);
  
  let navigate = useNavigate();

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

  const handleCategoryClick = (id) => {
    dispatch(setCategory(id));
    navigate(`/games`);
  }

  useEffect(() => {
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
          <button
            onClick={() => handleCategoryClick(null)}
            className="btn rounded-0 btn-outline-danger  w-100 p-2"
          >
            ဂိမ်းအားလုံး
          </button>
        </div>
        {categories &&
          categories.map((category) => (
            <div className="col-6 p-1" key={category.id}>
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="btn rounded-0 btn-outline-danger  w-100 p-2"
              >
                {category.title}
              </button>
            </div>
          ))}
      </div>
      )}
    </>
  );
}
