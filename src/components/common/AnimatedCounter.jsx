import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';

export default function AnimatedCounter({
  end,
  duration = 2.5,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const countUpRef = useRef(null);
  const { start } = useCountUp({
    ref: countUpRef,
    start: 0,
    end,
    duration,
    prefix,
    suffix,
    decimals,
    useEasing: true,
    useGrouping: true,
    separator: ',',
    startOnMount: false,
  });

  useEffect(() => {
    if (inView) {
      start();
    }
  }, [inView, start]);

  return (
    <span ref={ref} className={className}>
      <span ref={countUpRef} className="font-mono" />
    </span>
  );
}
