import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CarCard from "../../Components/CarCard/CarCard";
import { cars } from "../../Data/carsData";

const CarFilters = () => {
  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  const types = Array.from(new Set(cars.map((car) => car.type)));

  const prices = cars.map((car) => car.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  const [filters, setFilters] = useState({
    price: [minPrice, maxPrice],
    brands: [],
    types: []
  });

  const filteredCars = cars.filter((car) => {
    if (car.price < filters.price[0] || car.price > filters.price[1]) {
      return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
      return false;
    }
    if (filters.types.length > 0 && !filters.types.includes(car.type)) {
      return false;
    }
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

  const toggleType = (type) => {
    setFilters((prev) => {
      if (prev.types.includes(type)) {
        return { ...prev, types: prev.types.filter((t) => t !== type) };
      } else {
        return { ...prev, types: [...prev.types, type] };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      price: [minPrice, maxPrice],
      brands: [],
      types: []
    });
  };

  const onPriceChange = (value) => {
    setFilters((prev) => ({ ...prev, price: value }));
  };

  return (
    <div className="container-fluid mx-auto px-md-5 mt-4">
      <div>
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

                {/* Price Range using rc-slider */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Price (Lakh)</label>
                  <div className="d-flex justify-content-between mb-1">
                    <span>₹ {filters.price[0]}</span>
                    <span>₹ {filters.price[1]}</span>
                  </div>
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
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

                {/* Type Filter */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Type</label>
                  <div
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                    className="border rounded p-2"
                  >
                    {types.map((type) => (
                      <div className="form-check" key={type}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`type-${type}`}
                          checked={filters.types.includes(type)}
                          onChange={() => toggleType(type)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`type-${type}`}
                        >
                          {type}
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
            <h5 className="fw-bold">{filteredCars.length} Cars Found</h5>

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
    </div>
  );
};

export default CarFilters;
