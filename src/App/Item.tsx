import React, { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

const count = 200;

const step = 1.0 / count;

const threshold = Array.from({ length: count + 1 }, (_, index) => {
    const num = +(index * step).toFixed(4);
    return num;
});

type TProps = {
    wrapRef: React.RefObject<HTMLDivElement | null>;
};

const Item: FC<PropsWithChildren<TProps>> = (props) => {
    const {
        wrapRef,
    } = props;

    const itemRef = useRef<HTMLDivElement | null>(null);

    const [visiblePct, setVisiblePct] = useState(0);

    const intersectionObserverCallback: IntersectionObserverCallback = useCallback((entries) => {
        entries.forEach((entry) => {
            const pct = Math.floor(entry.intersectionRatio * 100);

            setVisiblePct(pct);
        });
    }, []);

    useEffect(() => {
        if (itemRef.current) {
            const item = itemRef.current;

            const intersectionObserverInit: IntersectionObserverInit = {
                root: wrapRef.current,
                rootMargin: undefined,
                threshold,
            };

            const observer = new IntersectionObserver(
                intersectionObserverCallback,
                intersectionObserverInit
            );

            observer.observe(item);

            return () => {
                observer.unobserve(item);
            };
        }
    }, [
        wrapRef,
        intersectionObserverCallback,
    ]);

    return (
        <div className='item' ref={itemRef}>
            {visiblePct} %
        </div>
    );
};

export default Item;
