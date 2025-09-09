package com.cyanchill.missingcore.music.toys.module

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise

import android.os.Build

import com.cyanchill.missingcore.music.toys.MusicGlyphToysSpec

class MusicGlyphToysModule internal constructor(reactContext: ReactApplicationContext) :
  MusicGlyphToysSpec(reactContext) {
  private val context = reactContext

  @ReactMethod
  override fun getDeviceInfo(promise: Promise) {
    val deviceInfoMap = Arguments.createMap()
    deviceInfoMap.putString("model", Build.MODEL)
    deviceInfoMap.putString("manufacturer", Build.MANUFACTURER)
    promise.resolve(deviceInfoMap)
  }

  companion object {
    const val NAME = "MusicGlyphToys"
  }

  override fun getName(): String = NAME
}
