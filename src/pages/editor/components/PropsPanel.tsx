import React from 'react';
import { BaseSprite, SpriteAttr } from 'spritejs';
import ColorEditor from './editors/color';
import PositionEditor from './editors/pos';
import SizeEditor from './editors/size';
import styles from './PropsPanel.less';

interface IPropsPanelProps {
  sprite?: BaseSprite;
  attrs?: SpriteAttr;
}

export interface IPropEditorProps {
  sprite: BaseSprite;
  attrs: SpriteAttr;
}

const attrEditors: ((props: IPropEditorProps) => JSX.Element)[] = [
  ColorEditor,
  PositionEditor,
  SizeEditor,
];

export default function PropsPanel(props: IPropsPanelProps) {
  const { attrs, sprite } = props;

  return (
    <div className={styles.props}>
      {attrs &&
        sprite &&
        attrEditors.map((Editor, index) => {
          return <Editor key={index} attrs={attrs} sprite={sprite} />;
        })}
    </div>
  );
}
