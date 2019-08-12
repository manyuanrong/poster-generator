import { VerticalPropLayout } from '../layout';
import React from 'react';
import { Slider } from 'antd';

export default function SliderCommonEditor() {
  return (
    <VerticalPropLayout label="Slider">
      <Slider />
    </VerticalPropLayout>
  );
}
