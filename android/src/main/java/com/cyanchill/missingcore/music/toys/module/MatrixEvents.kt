package com.cyanchill.missingcore.music.toys.module

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class MatrixEvents(private val reactContext: ReactContext) {
  fun sendEvent(event: GlyphButtonEvent, tag: String) {
    val payload = Arguments.createMap()
    payload.putString("tag", tag)
    reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(event.code, payload)
  }
}

enum class GlyphButtonEvent(val code: String) {
  SHORT_PRESS("short-press"),
  LONG_PRESS("long-press"),
  TOUCH_DOWN("touch-down"),
  TOUCH_UP("touch-up");

  companion object {
    fun fromCode(code: String?): GlyphButtonEvent? {
      if (code == null) return null
      return entries.find { it.code == code }
    }
  }
}
