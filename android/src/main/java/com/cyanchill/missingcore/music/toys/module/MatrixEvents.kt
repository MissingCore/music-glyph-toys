package com.cyanchill.missingcore.music.toys.module

import com.cyanchill.missingcore.music.toys.model.GlyphButtonEvent
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
