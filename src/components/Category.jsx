import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../actions/categoryActions";
import LoadingCategory from "./LoadingCategory";

export function Category({ handleCategoryClick }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const categories = useSelector((state) => state.categoryReducer.categories);
  // let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (
    <>
      {loading ? (
        <LoadingCategory />
      ) : (
        <div className="d-flex col-12 flex-wrap px-0 justify-content-center">
          <div className="col-6 p-1">
            <button
              onClick={() => handleCategoryClick("100")}
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
