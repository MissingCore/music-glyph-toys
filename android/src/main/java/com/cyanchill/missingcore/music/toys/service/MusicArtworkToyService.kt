package com.cyanchill.missingcore.music.toys.service

import android.content.Context
import androidx.core.content.ContextCompat
import com.cyanchill.missingcore.music.toys.R
import com.cyanchill.missingcore.music.toys.model.GlyphButtonEvent
import com.cyanchill.missingcore.music.toys.model.MatrixAction
import com.cyanchill.missingcore.music.toys.module.MatrixEvents
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
  private var matrixEventEmitter: MatrixEvents? = null
  private var matrixAction: MatrixAction? = null

  override fun performOnServiceConnected(
    context: Context,
    glyphMatrixManager: GlyphMatrixManager,
  ) {
    createReactEventEmitter(accessReactContext())

    val iconObject = GlyphMatrixObject.Builder().setImageSource(
      GlyphMatrixUtils.drawableToBitmap(
        ContextCompat.getDrawable(this, R.drawable.music_note_placeholder)
      )
    )
      .setScale(100)
      .setOrientation(0)
      .setPosition(0, 0)
      .setReverse(false)
      .build()

    val frame = GlyphMatrixFrame.Builder()
      .addTop(iconObject)
      .build(applicationContext)

    glyphMatrixManager.setMatrixFrame(frame.render())

    bgScope = CoroutineScope(Dispatchers.Default)
  }

  override fun performOnServiceDisconnected(context: Context) {
    super.performOnServiceDisconnected(context)
  }

  override fun onTouchPointPressed() {
    waitTimerJob?.cancel()
    waitTimerJob = bgScope.launch {
      delay(500L)
      matrixAction = MatrixAction.PLAY_PAUSE
      delay(3000L)
      matrixAction = MatrixAction.SKIP
    }
  }

  override fun onTouchPointReleased() {
    waitTimerJob?.cancel()
    waitTimerJob = null
    matrixEventEmitter?.sendEvent(GlyphButtonEvent.TOUCH_UP, tag, matrixAction)
    matrixAction = null
  }

  fun createReactEventEmitter(context: ReactContext?) {
    if (context == null) return
    this.matrixEventEmitter = MatrixEvents(context)
  }

  fun setMatrixArtwork(uri: String) {
    TODO("Not yet implemented - wait for after getting primary functionality working.")
  }

  private fun accessReactContext(): ReactContext? {
    val application = applicationContext as? ReactApplication ?: return null
    val reactInstanceManager = application.reactNativeHost.reactInstanceManager
    return reactInstanceManager.currentReactContext
  }
}
