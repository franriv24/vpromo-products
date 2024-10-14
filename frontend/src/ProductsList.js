import React, { useEffect, useState } from 'react';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const onPaginationPrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const onPaginationNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    fetch(`http://localhost:4000/products?page=${page}&limit=${limit}`)
      .then((response) => {
        setProducts(response.data.products);
        setTotal(response.data.total);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [page]);

  const totalPages = Math.ceil(total / limit);

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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={onPaginationPrev}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {page} de {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={onPaginationNext}
          disabled={page === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
