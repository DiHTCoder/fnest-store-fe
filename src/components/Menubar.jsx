import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { categories } from '../utils/data';
import { Sidebar } from '.';
import { useSidebarContext } from '../context/sidebar_context';

const Menubar = () => {
    const { openSidebar } = useSidebarContext();
    const itemsPerPage = 6;
    const [startIndex, setStartIndex] = useState(0);
    const endIndex = startIndex + itemsPerPage;
    const totalCategories = categories.length;
    const displayCategories = categories.slice(startIndex, endIndex);

    const nextSlide = () => {
        if (endIndex < totalCategories) {
            setStartIndex(startIndex + 1);
        } else {
            setStartIndex(0);
        }
    };

    const prevSlide = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            setStartIndex(totalCategories - itemsPerPage);
        }
    };

    return (
        <Wrapper className="">
            <div className="align-element py-4">
                <div className="flex items-center">
                    <div className="btn btn-ghost hover:bg-slate-100" onClick={openSidebar}>
                        <FaBarsStaggered className="animate-bounce" />
                        Danh mục
                    </div>
                    <ul className="flex">
                        {displayCategories.map((category) => {
                            const { id, text, image } = category;

                            return (
                                <li key={id}>
                                    <div className="btn btn-ghost hover:bg-slate-100 ">
                                        <div className="flex items-center">
                                            <img src={image} alt={text} className="person-img mr-2" />
                                            <span>{text}</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex space-x-4">
                        <button onClick={prevSlide}>
                            <FiChevronLeft className="w-[20px] h-[20px]" />
                        </button>
                        <button className="next" onClick={nextSlide}>
                            <FiChevronRight className="w-[20px] h-[20px]" />
                        </button>
                    </div>
                </div>
            </div>
            <Sidebar />
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .person-img {
        border-radius: 50%;
        align-items: center;
        text-align: center;
        width: 30px;
        height: 30px;
        object-fit: cover;
        border: 4px solid var(--clr-grey-8);
        box-shadow: var(--dark-shadow);
    }
`;

export default Menubar;
