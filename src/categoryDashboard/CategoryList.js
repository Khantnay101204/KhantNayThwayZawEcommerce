import CategoryRow from "./CategoryRow";

export default function CategoryList({
  categories,
  fetchCategories,
  triggerToast,
}) {
  return (
    <div className="itemList">
      <div className="listTable">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <CategoryRow
                triggerToast={triggerToast}
                category={category}
                key={category.categoryID}
                fetchCategories={fetchCategories}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
