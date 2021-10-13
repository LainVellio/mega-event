import React, { useState } from 'react';
import Button from '../common/forms/Button';

const Events = () => {
  const [messages, setMessages] = useState<Array<string>>([]);
  const eventMessages: Array<string> = [];

  const addMessage = (message: string) => {
    eventMessages.push(message);
  };

  const onContextMenu = (e: any) => {
    addMessage(`открыто контекстное меню над элементом`);
    setMessages(eventMessages);
  };

  const onFocus = (e: any) => {
    console.log('focus');
    if (e.target.id) {
      addMessage(
        `фокус установлен на дочернем элементе input id = ${e.target.id}`,
      );
    }
    if (e.currentTarget === e.target) {
      addMessage('фокус установлен на родительском элементе');
    }
    setMessages(eventMessages);
  };

  const onBlur = (e: any) => {
    if (e.target.id) {
      addMessage(`фокус снят с дочернего элемента input id = ${e.target.id}`);
    }
    if (e.currentTarget === e.target) {
      addMessage('фокус снят с родительского элемента');
    }
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // Не срабатывает при перемещении фокуса между дочерними элементами
      addMessage('фокус находится изнутри родительского элемента');
      setMessages(eventMessages);
    }
  };
  const clear = () => {
    setMessages([]);
  };

  return (
    <div>
      <div
        style={{
          color: 'white',
          textAlign: 'center',
          margin: '0px auto',
          width: 'max-content',
          padding: '20px',
          border: 'solid 1px white',
        }}
        tabIndex={1}
        onContextMenu={(e) => onContextMenu(e)}
        onFocus={(e) => onFocus(e)}
        onBlur={(e) => onBlur(e)}
      >
        <div>
          input 1 <input style={{ margin: '0px 0px 10px 0px' }} id="1" />
        </div>
        <div>
          input 2 <input style={{ margin: '0px 0px 10px 0px' }} id="2" />
        </div>
        <div>Родительский элемент</div>
      </div>
      <Button style={{ margin: '20px auto' }} onClick={() => clear()}>
        Clear
      </Button>
      <div
        style={{ color: 'white', margin: '20px auto', width: 'max-content' }}
      >
        {messages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
    </div>
  );
};
export default Events;
