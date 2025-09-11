export const Event = {
  /** Lifecycle Events */
  MOUNT: 'mount',

  /** Glyph Button Events */
  SHORT_PRESS: 'short-press',
  LONG_PRESS: 'long-press',
  TOUCH_DOWN: 'touch-down',
  TOUCH_UP: 'touch-up',
} as const;

export type Event = (typeof Event)[keyof typeof Event];

type EventPayload = { tag: string; action: string | null };

export type EventPayloadByEvent = {
  [Event.MOUNT]: EventPayload;

  [Event.SHORT_PRESS]: EventPayload;
  [Event.LONG_PRESS]: EventPayload;
  [Event.TOUCH_DOWN]: EventPayload;
  [Event.TOUCH_UP]: EventPayload;
};
