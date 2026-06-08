// IndexNow — мгновенно сообщает Яндексу и Bing об обновлённых URL.
// Ключ лежит в public/<KEY>.txt (должен быть доступен по https://nkeydesign.ru/<KEY>.txt).
// Запуск после деплоя:  node deploy/indexnow.mjs
// Можно передать конкретные URL:  node deploy/indexnow.mjs /privacy /consent

const HOST = "nkeydesign.ru";
const KEY = "af67dbb42ea5c2e7869ecf99c4dbc56f";

const paths = process.argv.slice(2);
const urlList = (paths.length ? paths : ["/"]).map(
  (p) => `https://${HOST}${p.startsWith("/") ? p : "/" + p}`,
);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log("IndexNow:", res.status, res.statusText);
console.log("Отправлено:", urlList.join(", "));
