package com.cyanchill.missingcore.music.toys.service

import android.content.Context
import android.os.Message
import androidx.core.content.ContextCompat
import androidx.core.os.bundleOf
import com.cyanchill.missingcore.music.toys.R
import com.cyanchill.missingcore.music.toys.GlyphButtonEvent
import com.cyanchill.missingcore.music.toys.MatrixAction
import com.cyanchill.missingcore.music.toys.MatrixEvents
import com.cyanchill.missingcore.music.toys.MessageUtils
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
import com.facebook.react.util.RNLog
import com.nothing.ketchum.GlyphMatrixFrame
import com.nothing.ketchum.GlyphMatrixManager
import com.nothing.ketchum.GlyphMatrixObject
import com.nothing.ketchum.GlyphMatrixUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class MusicArtworkToyService : GlyphMatrixService("Music-Artwork") {
  private val tag = "Music-Artwork"
  private lateinit var bgScope: CoroutineScope
  private var waitTimerJob: Job? = null
  private var matrixAction: MatrixAction? = null

  //#region [React Native Turbo Module]
  private val reactContext: ReactContext?
    get() = (application as ReactApplication).reactHost?.currentReactContext

//  private val matrixEventEmitter: MatrixEvents?
//    get() = reactContext?.let { MatrixEvents(it) }
  //#endregion

  private lateinit var musicIconFrame: GlyphMatrixFrame
  private lateinit var playPauseIconFrame: GlyphMatrixFrame
  private lateinit var skipIconFrame: GlyphMatrixFrame

  override fun performOnServiceConnected(
    context: Context,
    glyphMatrixManager: GlyphMatrixManager,
  ) {
    musicIconFrame = createGlyphMatrixFrameFromDrawable(R.drawable.music_note_placeholder)
    playPauseIconFrame = createGlyphMatrixFrameFromDrawable(R.drawable.play_pause)
    skipIconFrame = createGlyphMatrixFrameFromDrawable(R.drawable.skip_next)

    displayFrame(musicIconFrame)
    bgScope = CoroutineScope(Dispatchers.Default)

//    matrixEventEmitter?.sendEvent(GlyphButtonEvent.MOUNT, tag)
    emitEvent(GlyphButtonEvent.MOUNT)
  }

  override fun performOnServiceDisconnected(context: Context) {
    super.performOnServiceDisconnected(context)
  }

  override fun onTouchPointPressed() {
    waitTimerJob?.cancel()
    waitTimerJob = bgScope.launch {
      // Wait 500ms before allowing play/pause action to be available.
      delay(500L)
      matrixAction = MatrixAction.PLAY_PAUSE
      displayFrame(playPauseIconFrame)
      // Wait 3.5s before allowing skip action to be available.
      delay(3000L)
      matrixAction = MatrixAction.SKIP
      displayFrame(skipIconFrame)
    }
  }

  override fun onTouchPointReleased() {
    waitTimerJob?.cancel()
    waitTimerJob = null
//    // Notify React Native application of the action that should be done.
//    matrixEventEmitter?.sendEvent(GlyphButtonEvent.TOUCH_UP, tag, matrixAction)
    emitEvent(GlyphButtonEvent.TOUCH_UP, matrixAction)
    matrixAction = null
    // Restore displayed matrix.
    displayFrame(musicIconFrame)
  }

  override fun externalMessageHandler(msg: Message) {
    msg.data?.let { data ->
      if (data.containsKey(KEY_SET_ARTWORK)) {
        val artworkUri = data.getString(KEY_SET_ARTWORK)
        RNLog.w(reactContext, "Updating artwork with uri: $artworkUri")
        // For debugging purposes:
        emitEvent(GlyphButtonEvent.TOUCH_UP)
      } else if (data.containsKey("EVENT")) {
        val msg = Message.obtain(null, MessageUtils.MSG_RECEIVE_EVENT)
        msg.data = bundleOf(
            "EVENT" to data.getSerializable("EVENT"),
            "TAG" to data.getString("TAG"),
            "ACTION" to data.getString("ACTION"),
          )

        mClients.forEach { messenger ->
          messenger.send(msg)
        }
      } else {
        RNLog.w(reactContext, "Received an unsupported message with data: $data")
      }
    }
  }

  //#region [Internal Utils]
  /** Helper to create a reusable GlyphMatrixFrame from a drawable. */
  private fun createGlyphMatrixFrameFromDrawable(id: Int): GlyphMatrixFrame {
    val obj = GlyphMatrixObject.Builder().setImageSource(
      GlyphMatrixUtils.drawableToBitmap(ContextCompat.getDrawable(this, id))
    )
      .setScale(100)
      .setOrientation(0)
      .setPosition(0, 0)
      .setReverse(false)
      .build()

    return GlyphMatrixFrame.Builder()
      .addTop(obj)
      .build(applicationContext)
  }

  /** Helper to update the displayed matrix from a GlyphMatrixFrame. */
  private fun displayFrame(frame: GlyphMatrixFrame) {
    glyphMatrixManager?.setMatrixFrame(frame.render())
  }

  private fun emitEvent(event: GlyphButtonEvent, action: MatrixAction? = null) {
    val msg = Message.obtain(null, MessageUtils.MSG_RECEIVE_EVENT).apply {
      data = bundleOf(
        "EVENT" to event,
        "TAG" to tag,
        "ACTION" to action,
      )
    }

    mClients.forEach { messenger ->
      messenger.send(msg)
    }
  }
  //#endregion

  companion object {
    const val KEY_SET_ARTWORK = "set-artwork"
  }
}
