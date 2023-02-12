
icon:
	@pnpm tauri icon public/hyse.png
start:
	@pnpm tauri dev
build:
	@TAURI_PRIVATE_KEY=~/.tauri/vess.key TAURI_KEY_PASSWORD=1988 pnpm tauri build
opz:
	@upx --ultra-brute src-tauri/target/release/bundle/macos/Hyse.app/Contents/macOS/Hyse
cp:
	@cp -R src-tauri/target/release/bundle/macos/Vess.app /Applications
.PHONY: icon build opz