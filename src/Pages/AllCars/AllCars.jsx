import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CarCard from "../../Components/CarCard/CarCard";
import api from "../../Action/Api";
import { Link, useLocation } from "react-router-dom";

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    price: [0, 0],
    brands: []
  });

  const [priceRange, setPriceRange] = useState([0, 0]);

  const location = useLocation();

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/vehicles/all");
        const carsWithBrand = response.data.map((car) => ({
          ...car,
          brand: car.model.split(" ")[0]
        }));

        setCars(carsWithBrand);

        const prices = carsWithBrand.map((car) => car.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));

        setPriceRange([minPrice, maxPrice]);
        setFilters((prev) => ({
          ...prev,
          price: [minPrice, maxPrice],
          brands: []
        }));
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch cars"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brand = params.get("brand");
    setFilters((prev) => ({
      ...prev,
      brands: brand ? [brand] : []
    }));
  }, [location.search]);

  const brands = Array.from(new Set(cars.map((car) => car.brand)));

  const filteredCars = cars.filter((car) => {
    if (car.price < filters.price[0] || car.price > filters.price[1]) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) return false;
    return true;
  });

  const toggleBrand = (brand) => {
    setFilters((prev) => {
      if (prev.brands.includes(brand)) {
        return { ...prev, brands: prev.brands.filter((b) => b !== brand) };
      } else {
        return { ...prev, brands: [...prev.brands, brand] };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      price: [...priceRange],
      brands: []
    });
  };

  const onPriceChange = (value) => {
    setFilters((prev) => ({ ...prev, price: value }));
  };

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid mx-auto px-md-5 mt-4">
      <div className="row g-3">
        {/* Sidebar */}
        <div className="col-12 col-md-3 mb-3">
          <h5 className="fw-bold">Cars</h5>
          <div className="card shadow-lg rounded-4 mt-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Filters</h6>
                <button
                  className="btn btn-link text-primary p-0 text-decoration-none"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="form-label fw-bold">Price</label>
                <div className="d-flex justify-content-between mb-1">
                  <span>₹ {filters.price[0]}</span>
                  <span>₹ {filters.price[1]}</span>
                </div>
                <Slider
                  range
                  min={priceRange[0]}
                  max={priceRange[1]}
                  value={filters.price}
                  onChange={onPriceChange}
                  trackStyle={[{ backgroundColor: "#0d6efd" }]}
                  handleStyle={[
                    { borderColor: "#0d6efd" },
                    { borderColor: "#0d6efd" }
                  ]}
                />
              </div>

              {/* Brand Filter */}
              <div className="mb-3">
                <label className="form-label fw-bold">Brand</label>
                <div
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                  className="border rounded p-2"
                >
                  {brands.map((brand) => (
                    <div className="form-check" key={brand}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`brand-${brand}`}
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="col-12 col-md-9">
          <div className="row mt-3">
            {filteredCars.length === 0 ? (
              <p>No cars match the selected filters.</p>
            ) : (
              filteredCars.map((car) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                  key={car.id}
                >
                  <CarCard car={car} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCars;