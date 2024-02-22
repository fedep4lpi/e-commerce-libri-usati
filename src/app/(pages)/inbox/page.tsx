'use client';

import { useWebSocket } from 'next-ws/client';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const ws = useWebSocket();
  //    ^? WebSocket on the client, null on the server

  const [value, setValue] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const onMessage = useCallback(
    (event: MessageEvent<Blob>) =>
      void event.data.text().then(setMessage),
    [],
  );
  
  useEffect(() => {
    ws?.addEventListener('message', onMessage);
    return () => ws?.removeEventListener('message', onMessage);
  }, [onMessage, ws]);

  return 
  <div>
    <input
      type="text"
      value={value}
      onChange={event => setValue(event.target.value)}
    />

    <button onClick={() => ws?.send(value)}>
      Send message to server
    </button>

    <p>
      {message === null
        ? 'Waiting to receive message...'
        : `Got message: ${message}`}
    </p>
  </div>;
}
