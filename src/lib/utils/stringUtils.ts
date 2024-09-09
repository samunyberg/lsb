import { Client } from '../types';

export function formatName(client: Client) {
  return `${client?.firstName} ${client?.lastName}`;
}

export const clipText = (text: string, maxLength: number) => {
  if (!text) return '';

  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
};
