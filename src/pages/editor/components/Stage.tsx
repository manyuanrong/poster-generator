import React, { useCallback, useEffect, useRef } from 'react';
import { BaseSprite, Scene } from 'spritejs';
import { EditorStage } from '../../../editor-engine/stage';
import styles from './Stage.less';

export let scene: Scene;
export let stage: EditorStage;

interface IStage {
  onSelect(sprite?: BaseSprite): void;
}

export default function Stage(props: IStage) {
  const { onSelect } = props;
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = stageRef.current!;

    scene = new Scene(div, {
      resolution: [0, 0],
      viewport: [0, 0],
    });

    stage = new EditorStage(scene.layer());
    stage.setSelectHandler(onSelect);
    stage.createProject({
      width: 500,
      height: 500,
    });

    div.addEventListener('keydown', stage.onKeydown);
    div.addEventListener('keyup', stage.onKeyup);
    return () => {
      div.removeEventListener('keydown', stage.onKeydown);
      div.removeEventListener('keyup', stage.onKeyup);
    };
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.container} tabIndex={-1} ref={stageRef} />
    </div>
  );
}
