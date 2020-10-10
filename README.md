# Geek_Tree

## 初回インストール
sudo npm install ionic -g \
sudo gem install cocoapods \
xcode-select --install \
pod repo update \
ionic integrations enable capacitor
## npmインストール
npm install cordova-plugin-nativestorage \
npm install @ionic-native/native-storage
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
