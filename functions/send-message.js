// 環境変数からSlackのアクセストークンを取得する
const token = process.env.SLACK_API_TOKEN;

exports.handler = async (event) => {
  // リクエストボディからSlackに送信するメッセージを抽出する
  const requestBody = JSON.parse(event.body);
  const message = requestBody.message;

  // TODO: Slack APIを使ってメッセージを送る

  // クライアントへのレスポンスを返す
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ ok: true }),
  };
};
