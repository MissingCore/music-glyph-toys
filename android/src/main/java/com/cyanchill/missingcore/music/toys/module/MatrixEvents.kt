package com.cyanchill.missingcore.music.toys.module

import com.cyanchill.missingcore.music.toys.model.GlyphButtonEvent
import com.cyanchill.missingcore.music.toys.model.MatrixAction
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class MatrixEvents(private val reactContext: ReactContext) {
  fun sendEvent(event: GlyphButtonEvent, tag: String, action: MatrixAction? = null) {
    val payload = Arguments.createMap()
    payload.putString("tag", tag)
    payload.putNull("action")
    if (action != null) payload.putString("action", action.code)
    reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(event.code, payload)
  }
}
