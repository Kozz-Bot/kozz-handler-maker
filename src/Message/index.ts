import { Command, Media } from 'kozz-types';
import { Socket } from 'socket.io-client';
import { createReply } from './RoutineCreation/reply';
import { createAskResource } from './RoutineCreation/AskResource';

export type MessageObj = ReturnType<typeof createMessageObject>;

export const createMessageObject = (
	socket: Socket,
	command: Command,
	handlerId: string,
	templatePath?: string
) => {
	/**
	 * Replies the requester of the command.
	 */
	const reply = createReply(socket, command, templatePath);
	const ask = createAskResource(socket, {
		requester: {
			id: handlerId,
			type: 'Handler',
		},
	});

	return {
		ask: ask,
		rawCommand: command,
		media: command.message.media,
		quotedMessage: command.message.quotedMessage,
		body: command.message.body,
		type: command.message.messageType,
		isViewOnce: command.message.isViewOnce,
		reply,
	};
};
