# servicex-rn

A serviceX sdk for react-native (Support RN 0.59.x and above)

## Installation

```sh
yarn add servicex-rn
```

or

```sh
npm install servicex-rn
```

Then link the native module if your project does not support auto link (RN version < 0.60)

```sh
npx react-native link
```

### iOS:

In your iOS pod file, add the pod command below to your target:

```swift
  post_install do |installer|
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      end
    end
  end
```

Then we need to cd to the iOS folder then do `pod install` to update all the pod dependencies

If you see the issue

```
Specs satisfying the `servicex-rn` dependency were found, but they required a higher minimum deployment target.
```

Then please increase the supported deplolyment target to at least version 12.1: `platform :ios, '12.1'` in your pod file.

If you see the issue:

```
The Swift pod `RealmSwift` depends upon `Realm`, which does not define modules. To opt into those targets generating module maps (which is necessary to import them from Swift when building as static libraries), you may set `use_modular_headers!` globally in your Podfile, or specify `:modular_headers => true` for particular dependencies.
```

So please use `use_frameworks!` for your target ( if your project uses `Flipper` then we need to disable it )

if you see the issue:

```
... FinalSDK does not contain bitcode. You must rebuild it with bitcode enabled (Xcode setting ENABLE_BITCODE)...
```

Then please disable bitcode from your pods. The fast way to do it is go to your Pods project in XCode and set Enable Bitcode to Yes first then set it to No to disable bitcode complie for all pods.

### Android

We need to change `minSdk` to at least version 23 in `build.gradle`

```
minSdkVersion = 23
```

If you already have `allowBackup` attribute in your manifest like below so please remove it to avoid conflict with the library manifest

```
android:allowBackup="false"
```

In android, if you have the issue "More than one file was found with OS independent path 'lib/x86/libc++\_shared.so'" please add this code below inside `build.gradle`: (Link issue: https://github.com/tanersener/react-native-ffmpeg/issues/54)

```
android{
  ...

  packagingOptions {
        pickFirst '**/*.so'
  }

  ...
}
```

## Usage

Please refer to the example project inside the SDK to see how it work with our demo server. For detail of API usages, please check the API type spec.

```js
import serviceX from 'servicex-rn';

//** Initialize SDK
serviceX.initialize(API_KEY, ENV, MARKET_NAME);

//** Clear old user in the SDK
serviceX.clearCache();

//** You need to tell SDK what is current user profile. This must be set before calling getOffers or showOfferDetail or showPassport API
serviceX.setUserProfile(userProfile);

//** Gets a list of offers after filtering for a specific user.
const res = await serviceX.getOffers();

//** Begin redemption flow
serviceX.showOfferDetail(
  offerId,
  async (localId: string, credifyId: string) => {
    //** You need to add your push claim request in this callback and tell the SDK for the result
    try {
      const res = await pushClaim(localId, credifyId);
      console.log({ res });
      serviceX.setPushClaimRequestStatus(true);
    } catch (error) {
      serviceX.setPushClaimRequestStatus(false);
    }
  }
);

//** Show Credify passport page for user to login to see the offers's status
serviceX.showPassport(() => {
  //** This callback is for dismiss action (user closes the passport window)
  console.log('passport is dismissed');
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
