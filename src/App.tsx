import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handlePage = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <>
      {products.length ? (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product: any) => (
            <div key={product.id} className="products__single">
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="loader">
          <div>Loading Products...</div>
        </div>
      )}
      {products.length && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => handlePage(page - 1)}
          >
            Previous
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => handlePage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => handlePage(page + 1)}
          >
            Next
          </span>
        </div>
      )}
    </>
  );
}

export default App;
