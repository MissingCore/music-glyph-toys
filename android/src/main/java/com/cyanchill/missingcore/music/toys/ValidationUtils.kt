package com.cyanchill.missingcore.music.toys

import android.os.Build

object ValidationUtils {
  /** Helps ensure we run this code on supported devices. */
  fun isDeviceSupported(): Boolean {
    val isAndroid35OrHigher = Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM

    val isNothingManufacturer = Build.MANUFACTURER.equals("Nothing", ignoreCase = true)
    val isNothingPhone3 = Build.MODEL.equals("A024", ignoreCase = true)

    return isAndroid35OrHigher && isNothingManufacturer && isNothingPhone3
  }
}
