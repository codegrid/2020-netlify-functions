const fetch = require('node-fetch');

// 環境変数からSlackのアクセストークンを取得する
const token = process.env.SLACK_API_TOKEN;

exports.handler = async (event) => {
  // リクエストボディからSlackに送信するメッセージを抽出する
  const requestBody = JSON.parse(event.body);
  const message = requestBody.message;

  // Slack APIを使ってメッセージを送る
  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      channel: 'general',
      text: message,
    }),
  }).then(res => res.json());

  console.log(res);

  // クライアントへのレスポンスを返す
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ ok: true }),
  };
};
