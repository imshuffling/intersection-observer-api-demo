import React, { useRef } from 'react';
import './App.css';

function App() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const options = {
    rootMargin: '-100% 0px 0px 0px',
  };

  const callback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      heroRef.current.classList.remove('hidden');
    } else if (window.scrollY >= 100) {
      heroRef.current.classList.add('hidden');
    }
  };

  const observer = new IntersectionObserver(callback, options);

  React.useEffect(() => {
    observer.observe(contentRef.current);

    const handleScroll = () => {
      if (window.scrollY >= 1) {
        heroRef.current.classList.add('hidden');
        setTimeout(() => {
          contentRef.current.classList.add('fade-out');
          setTimeout(() => {
            contentRef.current.classList.add('fade-in');
          }, 500);
        }, 500);
      } else {
        heroRef.current.classList.remove('hidden');
        contentRef.current.classList.remove('fade-out');
        contentRef.current.classList.remove('fade-in');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [observer]);

  return (
    <div className='App'>
      <div ref={heroRef} className='hero'>
        <h1>Hero Section</h1>
      </div>
      <div ref={contentRef} className='content'>
        <h2>Content Section</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          vestibulum velit eu metus tincidunt, quis luctus mi dignissim.
          Curabitur consectetur, nibh non blandit tincidunt, sapien sapien
          posuere mauris, sit amet sollicitudin orci quam eget lorem. Integer
          vitae mi eget velit sollicitudin pretium vitae vel nisi. Etiam
          condimentum dapibus tellus id luctus. Vivamus posuere erat vel quam
          eleifend, eget ullamcorper lacus malesuada. Sed id nunc auctor, semper
          purus vel, ullamcorper mauris. Integer at enim leo. Integer eu aliquam
          justo. Integer eu sapien odio.
        </p>
        <p>
          Integer sit amet erat sed dolor maximus congue. Donec eleifend libero
          eget quam laoreet, quis dapibus elit fringilla. Aenean feugiat
          molestie justo, a dapibus ex consequat vel. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Integer vel sodales lectus. Nullam facilisis diam at ex
          consectetur sagittis. Donec pharetra mi vel arcu sodales bibendum.
          Mauris elementum, sapien non tristique bibendum, elit arcu commodo
          lorem, sit amet sollicitudin sem nibh vel enim. Vestibulum
          sollicitudin efficitur dolor, vitae feugiat libero ullamcorper sit
          amet. Vivamus eget odio commodo, ultricies turpis in, feugiat enim.
        </p>
      </div>
    </div>
  );
}

export default App;
