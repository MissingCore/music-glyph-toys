package com.cyanchill.missingcore.music.toys.model

enum class GlyphButtonEvent(val code: String) {
  MOUNT("mount"),
  SHORT_PRESS("short-press"),
  LONG_PRESS("long-press"),
  TOUCH_DOWN("touch-down"),
  TOUCH_UP("touch-up");

  companion object {
    fun fromCode(code: String?): GlyphButtonEvent? {
      if (code == null) return null
      return entries.find { it.code == code }
    }
  }
}
