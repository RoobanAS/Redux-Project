import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoke, fetchCategories } from "./jokeSlice";

function App() {
  const [category, setCategory] = useState("");
  const joke = useSelector((state) => state.joke.joke);
  const loading = useSelector((state) => state.joke.loading);
  const error = useSelector((state) => state.joke.error);
  const categories = useSelector((state) => state.joke.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleChangeCategory(e) {
    setCategory(e.target.value);
  }

  function handleFetch() {
    if (category) {
      dispatch(fetchJoke(category));
    }
  }

  return (
    <div className="content">
      {loading ? (
        <div className="loading-container">
          <h1 className="loading">Loading...</h1>
        </div>
      ) : (
        <>
          <input
            onChange={handleChangeCategory}
            placeholder="Input search text"
            className="input"
          />
          <button onClick={handleFetch} className="button">
            {category ? `Get ${category}` : "Get Jokes"}
          </button>
          {error && (
            <div className="error-container">
              <h2 className="error">
                Error: No jokes for category \"{category}\" found.
              </h2>
              {categories.length > 0 && (
                <p className="categories">
                  Available lists are: {categories.join(", ")}.
                </p>
              )}
            </div>
          )}
          {!error && joke && <h1 className="joke">{joke}</h1>}
        </>
      )}
    </div>
  );
}

export default App;
