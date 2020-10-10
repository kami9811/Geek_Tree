# Geek_Tree

## 初回インストール
sudo npm install ionic -g \
sudo gem install cocoapods \
xcode-select --install \
pod repo update \
ionic integrations enable capacitor
## npmインストール
-- 現在無し --
## アプリのビルド
### 初回（iOS）
ionic build --prod \
ionic cap sync \
ionic cap copy ios \
ionic cap open ios
### 初回（Android）
ionic build --prod \
ionic cap sync \
ionic cap copy android \
ionic cap open android
### 2回目以降
ionic build --prod \
ionic cap copy
