package com.cyanchill.missingcore.music.toys

import android.os.Build
import com.cyanchill.missingcore.music.toys.service.MusicArtworkToyService
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class MusicGlyphToysModule(reactContext: ReactApplicationContext) :
  NativeMusicGlyphToysSpec(reactContext), MatrixEventHandler {

  private val context = reactContext
  private var musicArtworkToyService: MusicArtworkToyService? = null

  init {
    MatrixEvent.handler = this
  }

  override fun getTypedExportedConstants(): Map<String, Any?> {
    val constants = HashMap<String, Any?>()
    constants["isDeviceSupported"] = ValidationUtils.isDeviceSupported()
    return constants
  }

  override fun setUpToy() {
    if (ValidationUtils.isDeviceSupported()) {
      this.musicArtworkToyService = MusicArtworkToyService()
      musicArtworkToyService!!.createReactEventEmitter(context)
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
  override fun sendEvent(event: GlyphButtonEvent, tag: String, action: MatrixAction?) {
    val payload = Arguments.createMap().apply {
      putString("tag", tag)
      putNull("action")
    }
    if (action != null) payload.putString("action", action.code)

    if (event == GlyphButtonEvent.MOUNT) emitOnMount(payload)
    else if (event == GlyphButtonEvent.SHORT_PRESS) emitOnShortPress(payload)
    else if (event == GlyphButtonEvent.LONG_PRESS) emitOnLongPress(payload)
    else if (event == GlyphButtonEvent.TOUCH_DOWN) emitOnTouchDown(payload)
    else if (event == GlyphButtonEvent.TOUCH_UP) emitOnTouchUp(payload)
  }

  /** Help test whether the events are fired correctly. */
  override fun testEvent(event: String) {
    val glyphEvent = GlyphButtonEvent.fromCode(event)
    if (glyphEvent != null) sendEvent(glyphEvent, "test")
  }
  //#endregion

  companion object {
    const val NAME = NativeMusicGlyphToysSpec.NAME
  }
}
