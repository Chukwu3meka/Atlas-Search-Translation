const { useRef, useEffect } = require("react");

// Prevent useEffect hook from running on ComponentDidMount()
const useSkipFirstEffect = (callback, dependencies) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    // Using a ref you can track the first render, set to false after the first render.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      callback();
    }
  }, [callback, ...dependencies]);
};

export default useSkipFirstEffect;
