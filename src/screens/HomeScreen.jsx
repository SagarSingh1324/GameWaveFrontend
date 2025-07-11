import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice'; 
import ProductCard from '../components/ProductCard';
import ProductFilterPanel from '../components/ProductFilterPanel';
import './CSS/HomeScreen.css'; 

const HomeScreen = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: products, isLoading, error } = useGetProductsQuery({
    brandList: selectedBrands,
    categoryList: selectedCategories,
  });

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="home-screen">
      <h1 className="section-title">Latest Products</h1>
      <Row>
        <Col md={2}>
          <ProductFilterPanel
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            onBrandChange={handleBrandChange}
            onCategoryChange={handleCategoryChange}
          />
        </Col>
        <Col md={10}>
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : error ? (
            <div className="error-message">
              {error?.data?.message || error.error}
            </div>
          ) : (
            <Row className="products-row">
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
