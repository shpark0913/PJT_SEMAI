const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

const createWindow = () => {
  // 윈도우의 크기를 지정한다.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.setMenu(null);

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  // win.loadFile("public/index.html");
  win.loadURL(startUrl);
};

// 브라우저 윈도우는 app 모듈이 ready 상태일 때만 실행할 수 있음.
app.whenReady().then(() => {
  createWindow();

  // macOS는 창이 닫혀도 계속 실행되고 있음, 그래서 새로 실행해도 기존의 것을 열어주면 됨
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 윈도우, 리눅스에서 창을 닫으면 앱을 멈추기
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
