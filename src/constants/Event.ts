export const Event = {
  SHORT_PRESS: 'short-press',
  LONG_PRESS: 'long-press',
  TOUCH_DOWN: 'touch-down',
  TOUCH_UP: 'touch-up',
} as const;

export type Event = (typeof Event)[keyof typeof Event];

type EventPayload = { tag: string };

export type EventPayloadByEvent = {
  [Event.SHORT_PRESS]: EventPayload;
  [Event.LONG_PRESS]: EventPayload;
  [Event.TOUCH_DOWN]: EventPayload;
  [Event.TOUCH_UP]: EventPayload;
};
