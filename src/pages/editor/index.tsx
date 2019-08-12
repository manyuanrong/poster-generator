import React, { useCallback, useState } from 'react';
import { BaseSprite, SpriteAttr } from 'spritejs';
import NewProject from './components/NewProject';
import PropsPanel from './components/PropsPanel';
import SpritesLibaray from './components/SpritesLibaray';
import Stage, { stage } from './components/Stage';
import ToolBar from './components/ToolBar';
import styles from './index.less';

export default function EditorPage() {
  const [currentSprite, setCurrentSprite] = useState<BaseSprite>();
  const [currentSpriteAttrs, setCurrentSpriteAttrs] = useState<SpriteAttr>();
  const [showCreate, setShowCreate] = useState(false);

  const openCreate = useCallback(() => setShowCreate(true), []);
  const hideCreate = useCallback(() => setShowCreate(false), []);

  const onCreateSprite = useCallback(sprite => {
    stage.append(sprite);
  }, []);

  const onCreateProject = useCallback(config => {
    setShowCreate(false);
    stage.createProject(config);
  }, []);

  const onSelect = useCallback((sprite: BaseSprite) => {
    setCurrentSprite(sprite);
    sprite && setCurrentSpriteAttrs(sprite.attr());
  }, []);

  return (
    <div className={styles.editor}>
      <ToolBar onOpenCreateProject={openCreate} />
      <NewProject visible={showCreate} onCreate={onCreateProject} onCancel={hideCreate} />
      <div className={styles.body}>
        <SpritesLibaray onCreateSprite={onCreateSprite} />
        <Stage onSelect={onSelect} />
        <PropsPanel sprite={currentSprite} attrs={currentSpriteAttrs} />
      </div>
    </div>
  );
}
