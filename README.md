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
    > C:\Users\\<Your user name>\AppData\Local\Android\Sdk
- JAVA_HOME: Path to the Java 8 JDK. Most likely installed in:
    > C:\Program Files\Java\jdk1.8.0_202

Clone the repository and run `$ yarn`.

Finally connect an android v8.0 or higher device and run `$ expo run:android`. Make sure it has USB debugging turned on.
