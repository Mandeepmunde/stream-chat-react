import React, { createContext, PropsWithChildren, useContext } from 'react';
import type {
  MessageInputHookProps,
  MessageInputState,
} from '../components/MessageInput/hooks/messageInput';
import type {
  CustomTrigger,
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
} from '../../types/types';
import type { MessageInputProps } from '../components/MessageInput';

export type MessageInputContextValue<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType,
  V extends CustomTrigger = CustomTrigger
> = MessageInputState<At, Us> &
  MessageInputHookProps<Co, Us> &
  MessageInputProps<At, Ch, Co, Ev, Me, Re, Us, V>;

export const MessageInputContext = createContext<
  (MessageInputState & MessageInputHookProps) | undefined
>(undefined);

export const MessageInputContextProvider = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType,
  V extends CustomTrigger = CustomTrigger
>({
  children,
  value,
}: PropsWithChildren<{
  value: MessageInputContextValue<At, Ch, Co, Ev, Me, Re, Us, V>;
}>) => (
  <MessageInputContext.Provider value={value as MessageInputContextValue}>
    {children}
  </MessageInputContext.Provider>
);

/**
 * hook for MessageInput context
 */
export const useMessageInputContext = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType,
  V extends CustomTrigger = CustomTrigger
>() => {
  const contextValue = useContext(MessageInputContext);
  if (contextValue === undefined) {
    console.warn(
      'Empty MessageInputContext consumed. Make sure you wrap every component that uses MessageInputContext with a MessageInputContextProvider',
    );
  }

  return contextValue as MessageInputContextValue<At, Ch, Co, Ev, Me, Re, Us, V>;
};
