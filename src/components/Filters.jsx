import React from 'react';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
const Filters = () => {
    return (
        <div className="bg-base-200 items-center py-4 px-4 grid grid-cols-5 gap-x-4 gap-y-8">
            {/* Ô tìm kiếm */}
            <FormInput
                type="search"
                label="Tìm kiếm sản phẩm"
                placeholder="Nhập tên sản phẩm..."
                name="search"
            />
            {/* Lọc theo công ty */}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Nhà sản xuất</span>
                </label>
                <select className="select select-bordered">
                    <option disabled selected>
                        Pick one
                    </option>
                    <option>Tất cả</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>
            </div>
            {/* Danh mục */}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Sản phẩm</span>
                </label>
                <select className="select select-bordered">
                    <option disabled selected>
                        Pick one
                    </option>
                    <option>Tất cả</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>
            </div>
            {/* Bộ sưu tập */}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Bộ sưu tập</span>
                </label>
                <select className="select select-bordered">
                    <option disabled selected>
                        Pick one
                    </option>
                    <option>Tất cả</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>
            </div>
            {/* Phòng */}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Phòng</span>
                </label>
                <select className="select select-bordered">
                    <option disabled selected>
                        Pick one
                    </option>
                    <option>Tất cả</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>
            </div>
            {/* Price range */}
            <input
                type="range"
                min={0}
                max="100"
                value="40"
                className="range range-accent"
            />
            {/* discount */}
            <div className="form-control">
                <label className="cursor-pointer label">
                    <span className="label-text">Có khuyến mãi</span>
                    <input
                        type="checkbox"
                        checked="checked"
                        className="checkbox checkbox-accent"
                    />
                </label>
            </div>

            {/* Buttons */}
            <button type="submit" className="btn btn-secondary text-white">
                <BsSearch />
                Tìm kiếm
            </button>
            <Link to="/products" className="btn btn-ghost">
                Xóa bộ lọc
            </Link>
        </div>
    );
};

export default Filters;
