import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice'; 
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import Paginate from '../components/Paginate';
import ProductFilterPanel from '../components/ProductFilterPanel';
import './CSS/HomeScreen.css'; 

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: products, isLoading, error } = useGetProductsQuery({
    brandList: selectedBrands,
    categoryList: selectedCategories,
    keyword: keyword,
    pageNumber: pageNumber,
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
          <>
            {!keyword ? (
              <div className="carousel-wrapper">
                <ProductCarousel />
              </div>
            ) : (
              <Link to='/' className='btn btn-light mb-4'>
                Go Back
              </Link>
            )}
            {isLoading ? (
              <div className="loader">Loading...</div>
            ) : error ? (
              <div className="error-message">
                {error?.data?.message || error.error}
              </div>
            ) : (
              <>
                <Row className="products-row">
                  {products?.products?.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
                <Paginate
                  pages={products.pages}
                  page={products.page}
                  keyword={keyword || ''}
                />
              </>
            )}
          </>
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
