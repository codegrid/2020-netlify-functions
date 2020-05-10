// TODO: 環境変数からSlackのアクセストークンを取得する

exports.handler = async (event) => {
  // TODO: リクエストボディからSlackに送信するメッセージを抽出する
  // TODO: Slack APIを使ってメッセージを送る

  // クライアントへのレスポンスを返す
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ ok: true }),
  };
};
