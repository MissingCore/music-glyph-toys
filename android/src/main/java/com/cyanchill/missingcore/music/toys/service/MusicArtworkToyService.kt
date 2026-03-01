package com.cyanchill.missingcore.music.toys.service

import android.content.Context
import androidx.core.content.ContextCompat
import com.cyanchill.missingcore.music.toys.R
import com.cyanchill.missingcore.music.toys.GlyphButtonEvent
import com.cyanchill.missingcore.music.toys.MatrixAction
import com.cyanchill.missingcore.music.toys.MatrixEvents
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
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

  //#region React Native Turbo Module
  private val reactContext: ReactContext?
    get() = (application as ReactApplication).reactHost?.currentReactContext

  private val matrixEventEmitter: MatrixEvents?
    get() = reactContext?.let { MatrixEvents(it) }
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

    matrixEventEmitter?.sendEvent(GlyphButtonEvent.MOUNT, tag)
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
    // Notify React Native application of the action that should be done.
    matrixEventEmitter?.sendEvent(GlyphButtonEvent.TOUCH_UP, tag, matrixAction)
    matrixAction = null
    // Restore displayed matrix.
    displayFrame(musicIconFrame)
  }

  fun setMatrixArtwork(uri: String) {
    TODO("Not yet implemented - wait for after getting primary functionality working.")
  }

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
}
