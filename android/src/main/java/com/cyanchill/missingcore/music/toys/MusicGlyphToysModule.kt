package com.cyanchill.missingcore.music.toys

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
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

  //#region [Reply Messenger]
  private val replyHandler = object : Handler(Looper.getMainLooper()) {
    override fun handleMessage(msg: Message) {
      val msgEvent = msg.data?.getSerializable("EVENT") as GlyphButtonEvent?
      val msgTag = msg.data?.getString("TAG") ?: "Reply-Handler"
      val msgAction = msg.data.getString("ACTION")

      val eventPayload = Arguments.createMap().apply {
        putString("tag", msgTag)
        putNull("action")
      }
      if (msgAction !== null) eventPayload.putString("action", msgAction)

      RNLog.w(context, "Received values: event=$msgEvent, tag=$msgTag, action=$msgAction")

      when (msg.what) {
        MessageUtils.MSG_RECEIVE_EVENT -> {
          when (msgEvent) {
            GlyphButtonEvent.MOUNT -> emitOnMount(eventPayload)
            GlyphButtonEvent.TOUCH_UP -> emitOnTouchUp(eventPayload)
            else -> {}
          }
        }
        else -> {
          Log.d(NAME, "Message: ${msg.what}")
          super.handleMessage(msg)
        }
      }
    }
  }

  private val replyMessenger = Messenger(replyHandler)
  //#endregion


  // https://developer.android.com/develop/background-work/services/bound-services#Messenger
  private var mService: Messenger? = null
  private val connection = object : ServiceConnection {
    override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
      mService = Messenger(service)

      try {
        val msg = Message.obtain(null, MessageUtils.MSG_REGISTER_CLIENT).apply {
          replyTo = replyMessenger
        }
        mService?.send(msg)
      } catch (e: RemoteException) {
        RNLog.e(context, "Failed to register replyTo.")
      }
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
    bindToToyService("initialization")
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
    bindToToyService("setUpToy()")
  }

  override fun onCleanUp() {
    // Unbind the service via JS when it's no longer needed (which will turn off the
    // Glyph Matrix).
    if (mService !== null) {
      val msg = Message.obtain(null, MessageUtils.MSG_UNREGISTER_CLIENT).apply {
        replyTo = replyMessenger
      }
      mService?.send(msg)
      context.unbindService(connection)
    }
    mService = null
  }

  override fun setMatrixArtwork(uri: String) {
    val msg = Message.obtain(null, MessageUtils.MSG_EXTERNAL_GLYPH_ACTION).apply {
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

  //#region [Internal Helpers]
  private fun bindToToyService(tag: String) {
    try {
      val intent = Intent(context, MusicArtworkToyService::class.java)
      val bound = context.bindService(intent, connection, Context.BIND_AUTO_CREATE)
      RNLog.w(context, "[MusicArtworkToyService] Auto-bind result during `$tag`: $bound")
    } catch (e: Exception) {
      RNLog.w(context, "[MusicArtworkToyService] Auto-bind failed during `$tag`.")
    }
  }
  //#endregion

  companion object {
    const val NAME = NativeMusicGlyphToysSpec.NAME
  }
}
