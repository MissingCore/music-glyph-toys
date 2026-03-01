package com.cyanchill.missingcore.music.toys

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.Build
import android.os.IBinder
import android.os.Message
import android.os.Messenger
import android.os.RemoteException
import android.util.Log
import androidx.core.os.bundleOf
import com.cyanchill.missingcore.music.toys.service.GlyphMatrixService
import com.cyanchill.missingcore.music.toys.service.MusicArtworkToyService
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.util.RNLog

class MusicGlyphToysModule(reactContext: ReactApplicationContext) :
  NativeMusicGlyphToysSpec(reactContext) {

  private val context = reactContext
  private val eventEmitter: MatrixEvents
    get() = MatrixEvents(context)

  // https://developer.android.com/develop/background-work/services/bound-services#Messenger
  private var mService: Messenger? = null
  private val connection = object : ServiceConnection {
    override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
      mService = Messenger(service)
    }

    override fun onServiceDisconnected(name: ComponentName?) {
      mService = null
    }
  }

  init {
    if (!ValidationUtils.isDeviceSupported()) {
      Log.w(NAME, "Device does not support Glyph Matrix.")
      RNLog.w(context, "Device does not support Glyph Matrix.")
    }

    // Auto-bind to service if it's already running.
    try {
      val intent = Intent(context, MusicArtworkToyService::class.java)
      val bound = context.bindService(intent, connection, Context.BIND_AUTO_CREATE)
      RNLog.w(context, "[MusicArtworkToyService] Auto-bind result on initialization: $bound")
    } catch (e: Exception) {
      RNLog.w(context, "[MusicArtworkToyService] Auto-bind failed during initialization.")
    }
  }

  override fun getTypedExportedConstants(): Map<String, Any?> {
    val constants = HashMap<String, Any?>()
    constants["DeviceInfo"] = Arguments.createMap().apply {
      putString("model", Build.MODEL)
      putString("manufacturer", Build.MANUFACTURER)
    }
    constants["GlyphButtonEvent"] = GlyphButtonEvent.getConstants()
    constants["MatrixAction"] = MatrixAction.getConstants()
    constants["isDeviceSupported"] = ValidationUtils.isDeviceSupported()
    return constants
  }

  override fun setUpToy() {
    val intent = Intent(context, MusicArtworkToyService::class.java)
    val bound = context.bindService(intent, connection, Context.BIND_AUTO_CREATE)
    RNLog.w(context, "[MusicArtworkToyService] Auto-bind result in `setUpToy()`: $bound")
  }

  override fun onCleanUp() {
    // Unbind the service via JS when it's no longer needed (which will turn off the
    // Glyph Matrix).
    if (mService !== null) context.unbindService(connection)
    mService = null
  }

  override fun setMatrixArtwork(uri: String) {
    val msg = Message.obtain(null, GlyphMatrixService.MSG_EXTERNAL).apply {
      data = bundleOf(MusicArtworkToyService.KEY_SET_ARTWORK to uri)
    }
    try {
      mService?.send(msg)
    } catch (e: RemoteException) {
      RNLog.w(context, e.message ?: "Failed to run `setMatrixArtwork()`.")
    }
  }

  //#region [Events]
  /** Help test whether the events are fired correctly. */
  override fun testEvent(event: String, tag: String?, action: String?) {
    val glyphEvent = GlyphButtonEvent.fromCode(event)
    if (glyphEvent != null) {
      eventEmitter.sendEvent(
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
