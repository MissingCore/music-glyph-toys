package com.cyanchill.missingcore.music.toys.module

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise

import android.os.Build

import com.cyanchill.missingcore.music.toys.MusicGlyphToysSpec
import com.cyanchill.missingcore.music.toys.utils.ValidationUtils

class MusicGlyphToysModule internal constructor(reactContext: ReactApplicationContext) :
  MusicGlyphToysSpec(reactContext) {
  private val context = reactContext

  override fun getTypedExportedConstants(): Map<String, Any?> {
    val constants = HashMap<String, Any?>()
    constants["isDeviceSupported"] = ValidationUtils.isDeviceSupported()
    return constants
  }

  @ReactMethod
  override fun getDeviceInfo(promise: Promise) {
    val deviceInfoMap = Arguments.createMap()
    deviceInfoMap.putString("model", Build.MODEL)
    deviceInfoMap.putString("manufacturer", Build.MANUFACTURER)
    promise.resolve(deviceInfoMap)
  }

  @ReactMethod
  override fun setMatrixArtwork(uri: String, promise: Promise) {
    if (ValidationUtils.isDeviceSupported()) {
      TODO("Not yet implemented - wait for after getting primary functionality working.")
      promise.resolve(true)
    } else {
      promise.resolve(false)
    }
  }

  //#region [Events]
  @ReactMethod
  /** Help test whether the events are fired correctly. */
  override fun testEvent(event: String) {
    val glyphEvent = GlyphButtonEvent.fromCode(event)
    if (glyphEvent != null) {
      val matrixEventInstance = MatrixEvents(context)
      matrixEventInstance.sendEvent(glyphEvent, "test")
    }
  }

  @ReactMethod
  override fun addListener(eventName: String?) {
    // Keep: Required for RN built-in NativeEventEmitter calls.
  }

  @ReactMethod
  override fun removeListeners(count: Double) {
    // Keep: Required for RN built-in NativeEventEmitter calls.
  }
  //#endregion

  companion object {
    const val NAME = "MusicGlyphToys"
  }

  override fun getName(): String = NAME
}
