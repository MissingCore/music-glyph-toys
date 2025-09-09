package com.cyanchill.missingcore.music.toys.module

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.cyanchill.missingcore.music.toys.MusicGlyphToysSpec

class MusicGlyphToysModule internal constructor(reactContext: ReactApplicationContext) :
  MusicGlyphToysSpec(reactContext) {
  private val context = reactContext

  @ReactMethod
  override fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  companion object {
    const val NAME = "MusicGlyphToys"
  }

  override fun getName(): String = NAME
}
