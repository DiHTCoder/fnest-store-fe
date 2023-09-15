import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import data from '../utils/data';
import styled from 'styled-components';
const EvaluateSlider = () => {
    const [people, setPeople] = useState(data);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [nextIndex, setNextIndex] = React.useState(1);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % people.length);
        setNextIndex((nextIndex + 1) % people.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + people.length) % people.length);
        setNextIndex((nextIndex - 1 + people.length) % people.length);
    };

    useEffect(() => {
        let slider = setInterval(nextSlide, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [currentIndex]);

    return (
        <Wrapper>
            <div className="section-center">
                {people.map((person, personIndex) => {
                    const { id, image, name, title, quote } = person;

                    let position = '';
                    if (personIndex === currentIndex) {
                        position = 'activeSlide';
                    } else if (personIndex === nextIndex) {
                        position = 'nextSlide';
                    }

                    return (
                        <article className={position} key={id}>
                            <img
                                src={image}
                                alt={name}
                                className="person-img"
                            />
                            <h4>{name}</h4>
                            <p className="title">{title}</p>
                            <p className="text">{quote}</p>
                        </article>
                    );
                })}
                <button className="prev" onClick={prevSlide}>
                    <FiChevronLeft />
                </button>
                <button className="next" onClick={nextSlide}>
                    <FiChevronRight />
                </button>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    /* section */
    .section {
        width: 90vw;
        max-width: var(--max-width);
    }

    @media screen and (min-width: 992px) {
        .section {
            width: 95vw;
        }
    }

    .title {
        text-align: center;
        margin-bottom: 2rem;
    }
    .title h2 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
    }
    .title span {
        font-size: 0.85em;
        margin-right: 1rem;
        font-weight: 700;
    }
    .section-center {
        margin: 0 auto;
        width: 80vw;
        height: 450px;
        max-width: 800px;
        text-align: center;
        position: relative;
        display: flex;
        overflow: hidden;
    }
    .person-img {
        border-radius: 50%;
        margin-bottom: 1rem;
        width: 150px;
        height: 150px;
        object-fit: cover;
        display: inline-flex;
        border: 4px solid #cccccc;
    }
    article h4 {
        text-transform: uppercase;
        margin-bottom: 0.25rem;
    }
    .title {
        text-transform: capitalize;
        margin-bottom: 0.75rem;
    }
    .text {
        max-width: 35em;
        margin: 0 auto;
        margin-top: 2rem;
        line-height: 2;
    }
    .prev,
    .next {
        position: absolute;
        top: 200px;
        transform: translateY(-50%);
        background: var(--clr-grey-5);
        color: var(--clr-white);
        width: 1.25rem;
        height: 1.25rem;
        display: grid;
        place-items: center;
        border-color: transparent;
        font-size: 1rem;
        border-radius: var(--radius);
        cursor: pointer;
        transition: var(--transition);
    }
    .prev:hover,
    .next:hover {
        background: var(--clr-primary-5);
    }
    .prev {
        left: 0;
    }
    .next {
        right: 0;
    }
    @media (min-width: 800px) {
        .text {
            max-width: 45em;
        }
        .prev,
        .next {
            width: 2rem;
            height: 2rem;
            font-size: 1.5rem;
        }
    }
    article {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: var(--transition);
    }
    article.activeSlide {
        opacity: 1;
        transform: translateX(0);
    }
    article.lastSlide {
        transform: translateX(-100%);
    }
    article.nextSlide {
        transform: translateX(100%);
    }
`;
export default EvaluateSlider;
