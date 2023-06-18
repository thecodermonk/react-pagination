import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.total / 10);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const handlePage = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <>
      {products.length ? (
        <div className="products">
          {products.map((product: any) => (
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
          {[...Array(totalPages)].map((_, i) => {
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
            className={page < totalPages ? "" : "pagination__disable"}
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
