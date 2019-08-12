import React from 'react';
import styles from './layout.less';

interface ILayoutProps {
  label: string;
  className?: string;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

export function HorizontalPropLayout(props: ILayoutProps) {
  const { children, label, className } = props;
  return (
    <div className={styles.horizontal}>
      <div className={styles.hLabel}>{label}</div>
      <div className={styles.hChildren + ` ${className || ''}`}>{children}</div>
    </div>
  );
}

export function VerticalPropLayout(props: ILayoutProps) {
  const { children, label, className } = props;
  return (
    <div className={styles.vertical}>
      <div className={styles.vLabel}>{label}</div>
      <div className={styles.vChildren + ` ${className || ''}`}>{children}</div>
    </div>
  );
}
