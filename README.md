# Repoflex

Repoflex App source code.

## Development Windows (Android only)

To run in development mode, install the following:

- [Npm](https://nodejs.org/dist/v16.14.0/node-v16.14.0-x64.msi)
- Yarn using npm: `$ npm install --global yarn`
- Expo using npm: `$ npm install -g expo-cli`

- [Java 8 JDK](https://www.oracle.com/java/technologies/downloads/#java8-windows)
- [Android Studio](https://developer.android.com/studio)

Add the following system variables:
- ANDROID_HOME: Path to the Android sdk. Most likely installed in: 
    > C:\Users\\*Your user name*\AppData\Local\Android\Sdk
- JAVA_HOME: Path to the Java 8 JDK. Most likely installed in:
    > C:\Program Files\Java\jdk1.8.0_202

Clone the repository and run `$ yarn`.

Finally connect an android v8.0 or higher device and run `$ expo run:android`. Make sure it has USB debugging turned on.

## Development Mac Os (Ios and Android)

To run in development mode, install the following:

- [Npm](https://nodejs.org/dist/v16.14.2/node-v16.14.2.pkg)
- Yarn using npm: `$ npm install --global yarn`
- Expo using npm: `$ npm install -g expo-cli`

### Android

- [Android Studio](https://developer.android.com/studio)
- [Java 8 JDK](https://www.oracle.com/java/technologies/downloads/#java8-mac)

Add the following system variables:
- ANDROID_HOME: Path to the Android sdk. Most likely installed in: 
    > /Users/*Your user name*/Library/Android/sdk

Clone the repository and run `$ yarn`.

Add the following variables in the repository project:
* on android/local.properties
    > sdk.dir=/Users/zolbit/Library/Android/sdk
* on repoflex/android/gradle.properties
    > org.gradle.java.home=/Library/Java/JavaVirtualMachines/jdk1.8.0_333.jdk/Contents/Home

Finally connect an android v8.0 or higher device and run `$ expo run:android`. Make sure it has USB debugging turned on.

If gradle throws 'kotlin could not find the required jdk tools in the java installation', [check this article](https://docs.oracle.com/javase/9/install/installation-jdk-and-jre-macos.htm#JSJIG-GUID-577CEA7C-E51C-416D-B9C6-B1469F45AC78)



### Ios

- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

- Cocoapods by using brew: `$ brew install cocoapods`

Open Repoflex.xcodeproj and Repoflex.xcworkspace. This will open Xcode.

In xcode, click on Repoflex on the left pane to see its properties. Then on Signing & Capabilities->Team, select add team and add the Zolbit developer account.

Go into Xcode >Preferences->Accounts->Manage certificates and click on the '+' icon on the bottom left to download the Apple certificate.

In Preferences->Locations, check that Command Line Tools has something selected.

Go into the ios folder from the repository and run `$ pod install`.

Connect an Ios device, go into Window->Devices and Simulators and click on the '+' icon on the bottom left to add the connected device.

Finally click on Product->Run to run the application.

## Compiling and publishing updates

### Android(Windows and Macos)

Open app.json file on the root of the project and look for 'versionCode'. Increase the number by one.

Open build.gradle on > repoflex/android/app/ and look for 'versionCode'. Increase the number by one.

Go to the android folder and run `$ ./gradlew :app:bundleRelease`. This wil generate an .aab file required by the Google Play Store in 
> repoflex/Android/app/build/outputs/bundle/release

To generate an .apk file run `$ ./gradlew :app:assembleRelease`. The compiled application will be left at 
> repoflex/Android/app/build/outputs/apk/release 

#### Uploading to Play Store

Go to the [Google Play Console](https://play.google.com/console/about/).

### Ios

In Xcode go to Product->Archive and wait until the archiving process finishes.

