import { Icon } from 'antd';
import React from 'react';
import { BaseSprite, Label, Sprite } from 'spritejs';
import styles from './SpritesLibaray.less';

interface SpritesLibararProps {
  onCreateSprite: (sprite: BaseSprite) => void;
}

const sprites: { [key: string]: { icon: string; create: () => BaseSprite } } = {
  Sprite: {
    icon: 'picture',
    create: () => {
      return new Sprite({
        size: [100, 100],
        bgcolor: 'red',
      });
    },
  },
  Label: {
    icon: 'font-colors',
    create: () => {
      return new Label({
        text: '文本',
      });
    },
  },
};

export default function SpritesLibaray(props: SpritesLibararProps) {
  return (
    <div className={styles.libaray}>
      <ul>
        {Object.keys(sprites).map((key: string) => {
          const item = sprites[key];
          return (
            <li
              key={key}
              onClick={() => {
                props.onCreateSprite(item.create());
              }}
            >
              <Icon type={item.icon} />
              <span>{key}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
