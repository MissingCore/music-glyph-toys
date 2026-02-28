package com.cyanchill.missingcore.music.toys

interface MatrixEventHandler {
  fun sendEvent(event: GlyphButtonEvent, tag: String, action: MatrixAction? = null)
}

object MatrixEvent {
  @Volatile
  var handler: MatrixEventHandler? = null
}
