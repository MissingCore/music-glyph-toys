export const Action = {
  PLAY_PAUSE: 'play-pause',
  SKIP: 'skip',
} as const;

export type Action = (typeof Action)[keyof typeof Action];
