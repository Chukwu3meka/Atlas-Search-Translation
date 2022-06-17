const { useRef, useEffect } = require("react");

// Prevent useEffect hook from running on ComponentDidMount()
const useSkipFirstEffect = (callback, dependencies) => {
  const firstRenderRef = useRef(true);

  console.log("here a");

  useEffect(() => {
    console.log("here b");
    // Using a ref you can track the first render, set to false after the first render.
    if (firstRenderRef.current) {
      console.log("here c");
      firstRenderRef.current = false;
    } else {
      console.log("here d");
      callback();
    }
    // }, [callback, ...dependencies]);
  }, dependencies);
};

export default useSkipFirstEffect;
