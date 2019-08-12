import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { IPropEditorProps } from '../../PropsPanel';
import { VerticalPropLayout } from '../layout';
import styles from './index.less';
import isColor from './is-color';

export default function ColorEditor(props: IPropEditorProps) {
  const {
    attrs: { bgcolor },
    sprite,
  } = props;

  const [color, setColor] = useState(bgcolor);

  useEffect(() => {
    setColor(bgcolor!);
  }, [bgcolor]);

  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const onShow = useCallback(() => setPickerVisible(true), []);
  const onHide = useCallback(() => setPickerVisible(false), []);

  const onColorChange = useCallback(newColor => {
    if (newColor.rgb.a === 1) {
      newColor = newColor.hex;
    } else if (newColor.rgb.a === 0) {
      newColor = '';
    } else {
      const { r, g, b, a } = newColor.rgb;
      newColor = `rgba(${r},${g},${b},${a})`;
    }
    setColor(newColor);
    sprite.attr({ bgcolor: newColor });
  }, []);

  const onColorInputChange = useCallback(({ target: { value } }) => {
    setColor(value);
    console.log(value, isColor(value));
    if (isColor(value)) {
      sprite.attr({ bgcolor: value });
    }
  }, []);

  return (
    <VerticalPropLayout label="背景色">
      <div className={styles.picker}>
        {/* <input type="text" value={color} readOnly onRateChange/> */}
        <Input
          value={color}
          onChange={onColorInputChange}
          addonAfter={
            <div onClick={onShow} className={styles.color}>
              <div className={styles.bg} />
              <div className={styles.inner} style={{ background: color }} />
            </div>
          }
        />
        {pickerVisible && (
          <div className={styles.popoup}>
            <div className={styles.cover} onClick={onHide} />
            <SketchPicker onChange={onColorChange} color={color} />
          </div>
        )}
      </div>
    </VerticalPropLayout>
  );
}
