package com.cyanchill.missingcore.music.toys

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext

class MatrixEvents(reactContext: ReactContext) {
  private val mainModule = reactContext.getNativeModule(MusicGlyphToysModule.NAME) as MusicGlyphToysModule?

  fun sendEvent(event: GlyphButtonEvent, tag: String, action: MatrixAction? = null, _validationOverride: Boolean = false) {
    if (mainModule == null) return
    if (!ValidationUtils.isDeviceSupported() && !_validationOverride) return
    val payload = Arguments.createMap().apply {
      putString("tag", tag)
      putNull("action")
    }
    if (action != null) payload.putString("action", action.code)

    when (event) {
      GlyphButtonEvent.MOUNT -> mainModule.emitOnMount(payload)
      GlyphButtonEvent.SHORT_PRESS -> mainModule.emitOnShortPress(payload)
      GlyphButtonEvent.LONG_PRESS -> mainModule.emitOnLongPress(payload)
      GlyphButtonEvent.TOUCH_DOWN -> mainModule.emitOnTouchDown(payload)
      GlyphButtonEvent.TOUCH_UP -> mainModule.emitOnTouchUp(payload)
    }
  }
}
