
icon:
	@pnpm tauri icon public/hyse.png
start:
	@pnpm tauri dev
build:
	@TAURI_PRIVATE_KEY=~/.tauri/vess.key TAURI_KEY_PASSWORD=1988 pnpm tauri build
opz:
	@upx --ultra-brute src-tauri/target/release/bundle/macos/Hyse.app/Contents/macOS/Hyse
cp:
	@cp -R src-tauri/target/release/bundle/macos/Hyse.app /Applications
bin:
	@cp ~/Workspace/lab/hysteria/build/hysteria-darwin-amd64 src-tauri/bin/hysteria-v2-x86_64-apple-darwin
sync:
	@ssh root@la.alichen.top "systemctl stop hyse"
	@scp -C /Users/alichen/Workspace/lab/hysteria/build/hysteria-linux-amd64 root@la.alichen.top:/root/hysteria/hysteria
	@ssh root@la.alichen.top "systemctl start hyse"
sync-sj:
	@ssh root@sj.alichen.top "systemctl stop hyse_v2"
	@scp -C /Users/alichen/Workspace/lab/hysteria/build/hysteria-linux-amd64 root@sj.alichen.top:/root/hyse/hysteria
	@ssh root@sj.alichen.top "systemctl start hyse_v2"
.PHONY: icon build opz bin sync