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

  // 入力値が文字列でなければエラーを返して処理を終了する
  if (typeof requestBody.message !== 'string') {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ error: 'Message property must be a string.' }),
    };
  }

  const message = requestBody.message;

  // メッセージが空であればエラーを返して処理を終了する
  if (message === '') {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ error: 'Empty message.' }),
    };
  }

  // Slack APIを使ってメッセージを送る
  let res;

  try {
    res = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        channel: 'general',
        text: message,
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.log(`[ERROR] Function - ${error}`);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ error: 'Server error.' }),
    }
  }

  if (res.ok === false) {
    console.log(`[ERROR] Slack API - ${res.error}`);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ error: 'Server error.' }),
    };
  }

  // クライアントへのレスポンスを返す
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ ok: true }),
  };
};
