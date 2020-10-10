# Geek_Tree
## 注意事項
srcフォルダ, Assets.xcassets, Info.plist, README.md以外は共有しない. \
Assets.xcassets, Info.plistはiosフォルダ内に設置する. \
npmインストールはREADMEで管理しているもの以外実行しない.

## 初回インストール
sudo npm install ionic -g \
sudo gem install cocoapods \
xcode-select --install \
pod repo update \
ionic integrations enable capacitor
## npmインストール
npm install cordova-plugin-nativestorage \
npm install @ionic-native/native-storage \
npm install cordova-plugin-inappbrowser \
npm install @ionic-native/in-app-browser
## アプリのビルド
### 初回（iOS）
ionic build --prod \
ionic cap sync \
ionic cap add ios（既にiosフォルダがあるならadd->copy）\
ionic cap open ios
### 初回（Android）
ionic build --prod \
ionic cap sync \
ionic cap add android（既にandroidフォルダがあるならadd->copy） \
ionic cap open android
### 2回目以降
ionic build --prod \
ionic cap copy
