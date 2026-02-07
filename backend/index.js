export const handler = async (event) => {
  // 1. イベントからバケット名とオブジェクトキーを取得
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  console.log(`Processing: Bucket: ${bucket}, Key: ${key}`);

  try {
      // ここで画像解析やDB保存などの処理を行う
      // 今回のハンズオンではログ出力までとする
      const result = {
          message: "Metadata extracted successfully",
          details: {
              bucket: bucket,
              objectKey: key,
              timestamp: new Date().toISOString()
          }
      };
      
      console.log("Result:", JSON.stringify(result, null, 2));
      return result;
  } catch (err) {
      console.error("Error fetching object metadata:", err);
      throw err;
  }
};