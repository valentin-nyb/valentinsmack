const HOST = "valentinsmack.com";
const KEY = "725686aebb6f46f291df25df8ee8c151";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const urlList = [`https://${HOST}/`];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`IndexNow submit: ${res.status} ${res.statusText}`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
