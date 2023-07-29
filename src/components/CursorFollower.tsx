import { useEffect, useState } from "react"
import {StaggeredMotion, spring, presets} from "react-motion"
import {range} from 'lodash'

const CursorFollower = () => {
  const [state, setState] = useState({x: 250, y: 300})

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
  }, [])
  
  const handleMouseMove = ({pageX: x, pageY: y}: { pageX: number, pageY: number }) => {
    setState({x, y});
  };

  const handleTouchMove = ({touches}: { touches: TouchList }) => {
    handleMouseMove(touches[0]);
  };

  const getStyles = (prevStyles: any) => {
    // `prevStyles` is the interpolated value of the last tick
    const endValue = prevStyles.map((_:any, i:any) => {
      return i === 0
        ? state
        : {
          x: spring(prevStyles[i - 1].x, presets.gentle),
          y: spring(prevStyles[i - 1].y, presets.gentle),
        };
    });
    return endValue;
  };


  return (
    <StaggeredMotion
        defaultStyles={range(6).map(() => ({x: 0, y: 0}))}
        styles={getStyles}>
        {balls =>
          <div className="demo1">
            {balls.map(({x, y}: { x: number; y: number }, i:any) =>
              <div
                key={i}
                className={`demo1-ball ball-${i}`}
                style={{
                  WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                  transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                  zIndex: balls.length - i,
                }} />
            )}
          </div>
        }
      </StaggeredMotion>
  )
}

export default CursorFollower