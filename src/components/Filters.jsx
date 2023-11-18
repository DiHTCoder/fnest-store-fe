// Filters.js
import React, { useState } from 'react';
import { GrFilter, GrPowerReset } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { updateFilters, resetFilters } from '../features/product/filtersSlice';

const Filters = () => {
    const dispatch = useDispatch();
    const [priceMin, setPriceMin] = useState(0);

    const [filters, setFilters] = useState({
        search: '',
        sortBy: 'name.asc',
        priceMin: 0,
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        if (name === 'priceMin') {
            setPriceMin(value);
        }

        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };
    const handleApplyFilters = () => {
        const updatedFilters = { ...filters, priceMin };
        dispatch(updateFilters(updatedFilters));
    };

    const handleResetFilters = () => {
        setPriceMin(0);
        setFilters({
            search: '',
            sortBy: 'name.asc',
            priceMin: 0,
        });
        dispatch(resetFilters());
    };

    return (
        <div className="items-center py-4 px-4 grid grid-cols-5 gap-x-4 gap-y-8 my-4">
            {/* Ô tìm kiếm */}
            <div>
                <label className="label">
                    <span className="label-text">Tìm sản phẩm</span>
                </label>
                <input
                    type="search"
                    label="Tìm kiếm sản phẩm"
                    placeholder="Nhập tên sản phẩm..."
                    name="search"
                    className="input input-bordered w-full max-w-xs"
                    value={filters.search}
                    onChange={handleFilterChange}
                />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Sắp xếp</span>
                </label>
                <select
                    className="select select-bordered"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                >
                    <option value="name.asc">Tên: A-Z</option>
                    <option value="name.desc">Tên: Z-A</option>
                </select>
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Giá</span>
                </label>
                <select
                    className="select select-bordered"
                    name="priceMin"
                    value={priceMin}
                    onChange={handleFilterChange}
                >
                    <option value="default" disabled selected>
                        Chọn giá
                    </option>
                    <option value="1000000">Trên 1 triệu</option>
                    <option value="5000000">Trên 5 triệu</option>
                    <option value="10000000">Trên 10 triệu</option>
                    <option value="20000000">Trên 20 triệu</option>
                </select>
            </div>

            {/* BUTTONS */}
            <div>
                <label className="label">
                    <span className="label-text">Áp dụng</span>
                </label>
                <button className="btn btn-ghost btn-info" onClick={handleApplyFilters}>
                    <GrFilter />
                    Lọc
                </button>
                <button className="btn btn-ghost" onClick={handleResetFilters}>
                    <GrPowerReset />
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

export default Filters;
