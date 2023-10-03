import React from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';

const ProductsContainer = () => {
    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center my-3 border-b border-base-300 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex gap-x-4">
                        <BsFillGridFill />
                        <BsList />
                    </div>
                    <h2 className="font-medium">
                        ( Có 20 sản phẩm được tìm thấy)
                    </h2>
                </div>
                {/* Bộ sưu tập */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text capitalize">Sắp xếp</span>
                    </label>
                    <select
                        className="select select-bordered"
                        name="sắp xếp"
                        id="sort"
                        defaultValue="all"
                    >
                        <option value="hi">Tăng</option>
                        <option value="hi">Giảm</option>
                        <option value="hi">A-z</option>
                        <option value="hi">Z-a</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default ProductsContainer;
