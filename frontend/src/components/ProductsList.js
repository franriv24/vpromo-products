import { useEffect, useState } from 'react';
import { formatPrice } from '../utils/formatters';

const ProductsList = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  const onPaginationPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const onPaginationNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    fetch(`http://localhost:4000/products?page=${currentPage}&limit=${rowsPerPage}`)
      .then((response) => response.json())
      .then((data) => {
        const { products, total } = data;
        setProductList(products);
        setTotalPages(Math.ceil(total / rowsPerPage));
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [currentPage]);

  return (
    <div className="products-container">
      <h1>Lista de produtos</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{formatPrice(product.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={onPaginationPrev}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={onPaginationNext}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
