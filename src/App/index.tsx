import React, { useRef } from 'react';

import Item from './Item';

const items = [...(new Array(5))];

const App = () => {

    const wrapRef = useRef<HTMLDivElement>(null);

    return (
        <div className="page">
            <h1><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API" target='_blank' rel="noreferrer">Intersection Observer API</a> example<br /> <a href="https://github.com/bryzgalov1/intersection-observer-api-example" target='_blank' rel="noreferrer">GitHub</a></h1>

            <div className='section'>
                <div className='section__body'>
                    <div
                        className='wrap'
                        ref={wrapRef}
                    >
                        {items.map((_, index) => {
                            return (
                                <Item
                                    key={index}
                                    wrapRef={wrapRef}
                                />
                            );
                        })}
                    </div>
                    <textarea className='textarea' />
                </div>
            </div>
        </div>
    );
};

export default App;
