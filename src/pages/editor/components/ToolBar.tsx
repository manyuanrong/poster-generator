import { Icon, Menu } from 'antd';
import React, { useCallback, useState } from 'react';
import styles from './ToolBar.less';

const { SubMenu } = Menu;

interface ToolBarProps {
  onOpenCreateProject(): void;
}

export default function ToolBar(props: ToolBarProps) {
  const { onOpenCreateProject } = props;

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onMenuClick = useCallback(event => {
    console.log(event);
    const key = event.key;
    if (key === 'new') {
      onOpenCreateProject();
    }
  }, []);

  return (
    <div className={styles.toolbar}>
      <Menu onClick={onMenuClick} selectedKeys={selectedKeys} mode="horizontal">
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="file" />
              项目
            </span>
          }
        >
          <Menu.Item key="new">
            <Icon type="file-add" />
            新建
          </Menu.Item>
          <Menu.Item key="open">
            <Icon type="folder-open" />
            打开
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="#" target="_blank" rel="noopener noreferrer">
            帮助
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
}
