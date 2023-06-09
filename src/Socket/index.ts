import { io } from 'socket.io-client';
import { introduce } from './Events/Emit/Introduction';
import { Method } from '../Schema';
import { UseFn } from '../Instance/Handler';
import { onCommand } from './Events/Handle/Command';

export const connect = <T extends Record<string, any>>(
	address: string,
	moduleUseFns: UseFn[],
	templatePath: string,
	handlerName: string,
	methods: T,
	boundariesToHandle: string[],
	signature?: string
) => {
	const socket = io(address);

	introduce(socket, handlerName, methods, signature);

	const registerMethods = <
		T extends Record<string, Method<Record<string, any>>>
	>(
		methods: T
	) =>
		onCommand(
			socket,
			methods,
			moduleUseFns,
			handlerName,
			templatePath,
			boundariesToHandle
		);

	return {
		socket,
		registerMethods,
	};
};
