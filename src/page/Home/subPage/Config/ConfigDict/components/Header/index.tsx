import React, { ReactElement } from 'react';
import { Tabs } from 'antd';
import { nanoid } from 'nanoid'

const { TabPane } = Tabs;

interface Props {
  activeKey: string;
  paneList: any[];
  setActiveKey: (any) => void;
  setPaneList: (any) => void;
}

export default function DictHeader({ 
    activeKey, 
    paneList,
    setActiveKey, 
    setPaneList
}: Props): ReactElement {
  const onEdit = (target, action) => {
    console.log(target, action)
    if(action === 'remove') {
        remove(target)
    }else{
        add()
    }
  };

  const add = () => {
    let key = nanoid()
    setPaneList((list: any) => {
        console.log(list, "++")
        let newList = [...list]
        newList.push({
            title: 'new tab',
            content: <div>123</div>,
            key
        })
        console.log(list, '--');
        
        return newList
    })
  }

  const remove = targetKey => {
      console.log(targetKey)
    let newActiveKey = activeKey;
    let lastIndex;
    paneList.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = paneList.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setActiveKey(newActiveKey)
    setPaneList(newPanes)
  };

  return (
    <>
      <Tabs type="editable-card" 
        hideAdd
        onChange={setActiveKey} 
        activeKey={activeKey} 
        onEdit={onEdit}
    >
        {paneList.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}
