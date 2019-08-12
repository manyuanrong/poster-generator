import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { IPropEditorProps } from '../../PropsPanel';
import { stage } from '../../Stage';
import { VerticalPropLayout } from '../layout';
import styles from './index.less';

export default function PositionEditor(props: IPropEditorProps) {
  const { attrs, sprite } = props;
  const [x, setX] = useState(attrs.x);
  const [y, setY] = useState(attrs.y);

  useEffect(() => {
    setX(attrs.x);
    setY(attrs.y);
  }, [attrs]);

  const onChangeX = useCallback(({ target: { value } }) => {
    const x = parseInt(value) || 0;
    setX(x);
    sprite.attr('x', x);
    stage.strokeSelected();
  }, []);

  const onChangeY = useCallback(({ target: { value } }) => {
    const y = parseInt(value) || 0;
    setY(y);
    sprite.attr('y', y);
    stage.strokeSelected();
  }, []);

  return (
    <VerticalPropLayout label="位置" className={styles.position}>
      <Input addonBefore="X" onChange={onChangeX} value={x} />
      <Input addonBefore="Y" onChange={onChangeY} value={y} />
    </VerticalPropLayout>
  );
}
