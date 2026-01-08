import { useEffect, useRef } from 'react';

const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        animation = 'fadeIn',
        once = true
    } = options;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    entry.target.classList.remove('animate');
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin, once]);

    return ref;
};

export default useScrollAnimation;
