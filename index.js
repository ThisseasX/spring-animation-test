import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { useSpring, animated } from 'react-spring';
import './index.css';

const translate = (x, y) => `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

const App = () => {
  const [{ xy }, set] = useSpring(() => ({
    from: { xy: [window.innerWidth + 200, -(window.innerHeight + 100)] },
    xy: [window.innerWidth / 2, window.innerHeight / 2],
    config: { tension: 250, mass: 3 },
  }));

  const handleClick = ({ clientX, clientY }) => {
    set({ xy: [clientX, clientY] });
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  return <animated.div style={{ transform: xy.interpolate(translate) }} />;
};

render(<App />, document.getElementById('root'));
