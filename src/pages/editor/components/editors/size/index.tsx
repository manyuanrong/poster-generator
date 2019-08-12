import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { IPropEditorProps } from '../../PropsPanel';
import { stage } from '../../Stage';
import { VerticalPropLayout } from '../layout';
import styles from './index.less';

export default function SizeEditor(props: IPropEditorProps) {
  const { attrs, sprite } = props;
  const [width, setWidth] = useState(attrs.width);
  const [height, setHeight] = useState(attrs.height);

  useEffect(() => {
    setWidth(attrs.width);
    setHeight(attrs.height);
  }, [attrs]);

  const onChangeWidth = useCallback(({ target: { value } }) => {
    const width = parseInt(value) || 0;
    setWidth(width);
    sprite.attr('width', width);
    stage.strokeSelected();
  }, []);

  const onChangeHeight = useCallback(({ target: { value } }) => {
    const height = parseInt(value) || 0;
    setHeight(height);
    sprite.attr('height', height);
    stage.strokeSelected();
  }, []);
  return (
    <VerticalPropLayout label="大小" className={styles.size}>
      <Input addonBefore="宽" onChange={onChangeWidth} value={width} />
      <Input addonBefore="高" onChange={onChangeHeight} value={height} />
    </VerticalPropLayout>
  );
}
