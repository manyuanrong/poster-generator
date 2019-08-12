import { Form, Input, Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import styles from './NewProject.less';

const FormItem = Form.Item;

interface INewProjectProps {
  visible: boolean;
  onCreate(config: { width: number; height: number }): void;
  onCancel(): void;
}

export default function NewProject(props: INewProjectProps) {
  const { visible, onCreate, onCancel } = props;
  const [width, setWidth] = useState(750);
  const [height, setHeight] = useState(750);

  const onCreateClick = useCallback(() => {
    onCreate({
      width,
      height,
    });
  }, [width, height]);

  return (
    <Modal visible={visible} title="新建项目" onOk={onCreateClick} onCancel={onCancel}>
      <div className={styles.size}>
        <Input
          addonBefore="宽度"
          width={100}
          value={width}
          onChange={({ target: { value } }) => setWidth(parseInt(value || '0'))}
        />
        <Input
          addonBefore="高度"
          width={100}
          value={height}
          onChange={({ target: { value } }) => setHeight(parseInt(value || '0'))}
        />
      </div>
    </Modal>
  );
}
