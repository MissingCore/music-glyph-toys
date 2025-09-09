package com.cyanchill.missingcore.music.toys

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class MusicGlyphToysSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun getTypedExportedConstants(): Map<String, Any?>

  override fun getConstants(): Map<String, Any?> {
    return getTypedExportedConstants()
  }

  abstract fun getDeviceInfo(promise: Promise)

  abstract fun setMatrixArtwork(uri: String, promise: Promise)

  //#region [Events]
  abstract fun testEvent(event: String)

  // Below functions are required for RN built-in NativeEventEmitter calls.
  abstract fun addListener(eventName: String?)
  abstract fun removeListeners(count: Double)
  //#endregion
}
