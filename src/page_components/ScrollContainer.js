import { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import "../css/scroll_container.css"


function ScrollContainer() {
  const [state, setState] = useState([1, 2, 3, 4, 5]);

  const [ref, isVisible] = useInView({
    threshold: 1
  });

  const newData = [...Array(10).keys()].map((x) => x + state.length + 1);

  useEffect(() => {
    if (isVisible) {
      setState((state) => [...state, ...newData]);
    }
  }, [isVisible]);

  console.log([...newData]);

  return (
    <div className="List">
      {state.map((el, index) => (
        <div className="Item" key={index + el}>{el} </div>
      ))}
      <div className="Loader" ref={ref}><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i></div>
    </div>
  );
}
export default ScrollContainer;
