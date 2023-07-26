import { FC, ReactElement, useState, useRef } from 'react';

import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

import st from './ToolTip.module.scss';

interface IToolTipProps {
  children: ReactElement;
  customClass?: string;
  text: string;
}

const transitionClasses = {
  enter: st.enter,
  enterActive: st.enterActive,
  exit: st.exit,
  exitActive: st.exitActive,
};

const ToolTip: FC<IToolTipProps> = ({ children, text, customClass }) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isShow, setIsShow] = useState(false);
  const classesToolTip = cn(st.tooltip, customClass || '');

  const onMouseEnterHandler = (): void => {
    timeoutRef.current = setTimeout(() => {
      setIsShow(true);
    }, 500);
  };

  const onMouseLeaveHandler = (): void => {
    clearTimeout(timeoutRef.current);
    setIsShow(false);
  };

  return (
    <div
      className={st.container}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      <CSSTransition in={isShow} timeout={500} classNames={transitionClasses}>
        <div className={classesToolTip}>{text}</div>
      </CSSTransition>
    </div>
  );
};

export default ToolTip;
