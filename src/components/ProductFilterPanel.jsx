import './CSS/ProductFilterPanel.css';

const ProductFilterPanel = ({
  selectedBrands,
  selectedCategories,
  onBrandChange,
  onCategoryChange,
}) => {
  const brands = ['Razer', 'Logitech', 'HyperX', 'EvoFox', 'Redragon'];
  const categories = ['Mouse', 'Keyboard', 'Audio', 'Deskmat', 'Controller'];

  return (
    <div className="filter-panel">
      <h5>Filter By</h5>
      <div className="filter-section">
        <h6>Brands</h6>
        {brands.map((brand) => (
          <div key={brand} className="filter-checkbox">
            <input
              type="checkbox"
              id={`brand-${brand}`}
              checked={selectedBrands.includes(brand)}
              onChange={() => onBrandChange(brand)}
            />
            <label htmlFor={`brand-${brand}`}>{brand}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h6>Categories</h6>
        {categories.map((category) => (
          <div key={category} className="filter-checkbox">
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />
            <label htmlFor={`category-${category}`}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilterPanel;
