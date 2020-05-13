const fetch = require('node-fetch');

// 環境変数からSlackのアクセストークンを取得する
const token = process.env.SLACK_API_TOKEN;

exports.handler = async (event) => {
  // POSTリクエストでない場合にはエラーを返して処理を終える
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        Allow: 'POST',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ error: 'Method not allowed.' }),
    };
  }

  // 期待するContent-Typeでなければエラーを返して処理を終える
  if (!event.headers['content-type'].includes('application/json')) {
    return {
      statusCode: 415,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ error: 'Unsupported media type.' }),
    };
  }

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
