import ProductRow from "./ProductRow";

export default function ProductList({ products, fetchProducts, triggerToast }) {
  return (
    <div className="itemList">
      <div className="listTable">
        <table>
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                triggerToast={triggerToast}
                product={product}
                key={product.productID}
                fetchProducts={fetchProducts}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
