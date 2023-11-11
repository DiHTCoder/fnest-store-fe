import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import data from '../utils/data';
import styled from 'styled-components';
function App() {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        const lastIndex = people.length - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, people]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [index]);

    return (
        <Wrapper>
            <div className="relative flex min-h-[504px] items-center justify-center px-4 pb-12 pt-24 lg:min-h-[644px]">
                <div className="absolute inset-0 brightness-75">
                    {people.map((person, personIndex) => {
                        const { id, image, name, title, quote } = person;

                        let position = 'nextSlide';
                        if (personIndex === index) {
                            position = 'activeSlide';
                        }
                        if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
                            position = 'lastSlide';
                        }

                        return (
                            <article className={position} key={id}>
                                <img src={image} alt={name} className="mb-[10px] w-full h-[650px] object-cover" />
                            </article>
                        );
                    })}
                    <button className="prev" onClick={() => setIndex(index - 1)}>
                        <FiChevronLeft />
                    </button>
                    <button className="next" onClick={() => setIndex(index + 1)}>
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
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

export default App;
