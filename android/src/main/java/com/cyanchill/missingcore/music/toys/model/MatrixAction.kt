package com.cyanchill.missingcore.music.toys.model

enum class MatrixAction(val code: String) {
  PLAY_PAUSE("play-pause"),
  SKIP("skip");

  companion object {
    fun fromCode(code: String?): MatrixAction? {
      if (code == null) return null
      return entries.find { it.code == code }
    }
  }
}
