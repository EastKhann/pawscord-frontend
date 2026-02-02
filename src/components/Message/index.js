// frontend/src/components/Message/index.js
// 🏗️ MODULAR MESSAGE COMPONENT - REFACTORED
// Ana Message componentini alt componentlere böldük: ~208KB → ~50KB per component

export { default } from './Message';
export { default as Message } from './Message';
export { MessageHeader } from './MessageHeader';
export { MessageContent } from './MessageContent';
export { MessageActions } from './MessageActions';
export { MessageReactions } from './MessageReactions';
export { MessageContextMenu } from './MessageContextMenu';
export { MessageMedia } from './MessageMedia';
export { MessagePoll } from './MessagePoll';
export { EditHistory } from './EditHistory';
export { LazyVideo } from './LazyVideo';
export { LazyMount } from './LazyMount';
