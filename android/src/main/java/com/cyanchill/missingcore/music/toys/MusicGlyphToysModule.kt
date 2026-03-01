package com.cyanchill.missingcore.music.toys

import android.os.Build
import com.cyanchill.missingcore.music.toys.service.MusicArtworkToyService
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class MusicGlyphToysModule(reactContext: ReactApplicationContext) :
  NativeMusicGlyphToysSpec(reactContext) {

  private val context = reactContext
  private var musicArtworkToyService: MusicArtworkToyService? = null

  override fun getTypedExportedConstants(): Map<String, Any?> {
    val constants = HashMap<String, Any?>()
    constants["GlyphButtonEvent"] = GlyphButtonEvent.getConstants()
    constants["MatrixAction"] = MatrixAction.getConstants()
    constants["isDeviceSupported"] = ValidationUtils.isDeviceSupported()
    return constants
  }

  override fun setUpToy() {
    if (ValidationUtils.isDeviceSupported()) {
//      this.musicArtworkToyService = MusicArtworkToyService()
//      musicArtworkToyService!!.createReactEventEmitter(context)
    }
  }

  override fun getDeviceInfo(promise: Promise) {
    val deviceInfoMap = Arguments.createMap()
    deviceInfoMap.putString("model", Build.MODEL)
    deviceInfoMap.putString("manufacturer", Build.MANUFACTURER)
    promise.resolve(deviceInfoMap)
  }

  override fun setMatrixArtwork(uri: String, promise: Promise) {
    if (ValidationUtils.isDeviceSupported()) {
      musicArtworkToyService!!.setMatrixArtwork(uri)
      promise.resolve(true)
    } else {
      promise.resolve(false)
    }
  }

  //#region [Events]
  /** Abstraction layer to sending events via a single handler. */
  fun sendEvent(event: GlyphButtonEvent, tag: String, action: MatrixAction? = null) {
    val payload = Arguments.createMap().apply {
      putString("tag", tag)
      putNull("action")
    }
    if (action != null) payload.putString("action", action.code)

    when (event) {
      GlyphButtonEvent.MOUNT -> emitOnMount(payload)
      GlyphButtonEvent.SHORT_PRESS -> emitOnShortPress(payload)
      GlyphButtonEvent.LONG_PRESS -> emitOnLongPress(payload)
      GlyphButtonEvent.TOUCH_DOWN -> emitOnTouchDown(payload)
      GlyphButtonEvent.TOUCH_UP -> emitOnTouchUp(payload)
    }
  }

  /** Help test whether the events are fired correctly. */
  override fun testEvent(event: String, tag: String?, action: String?) {
    val glyphEvent = GlyphButtonEvent.fromCode(event)
    if (glyphEvent != null) {
      sendEvent(
        glyphEvent,
        tag ?: "testEvent()",
        MatrixAction.fromCode(action)
      )
    }
  }
  //#endregion

  companion object {
    const val NAME = NativeMusicGlyphToysSpec.NAME
  }
}
