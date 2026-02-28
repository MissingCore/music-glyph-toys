package com.cyanchill.missingcore.music.toys

object MatrixEvent {
  @Volatile
  var handler: MatrixEventHandler? = null
}

interface MatrixEventHandler {
  fun sendEvent(event: GlyphButtonEvent, tag: String, action: MatrixAction? = null)
}
