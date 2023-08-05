const crypto = require('crypto');
// const fetch = require('node-fetch');
// const superagent = require('superagent');

// Replace with your AWS credentials and region
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_REGION = 'eu-west-1'; // For example, 'us-west-2'

const bucketName = 'some-test';
const objectKey = 'example-object.txt';
const data = 'Hello, this is the content of the uploaded object!';

function getSignatureKey(key, date, region, service) {
  const kDate = crypto.HmacSHA256(date, 'AWS4' + key);
  const kRegion = crypto.HmacSHA256(region, kDate);
  const kService = crypto.HmacSHA256(service, kRegion);
  const kSigning = crypto.HmacSHA256('aws4_request', kService);
  return kSigning;
}

async function uploadObjectToBucket(bucketName, objectKey, data) {
  const method = 'PUT';
  const contentType = 'text/plain';
  const host = `${bucketName}.s3.amazonaws.com`;
  const currentDate = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
  const date = currentDate.slice(0, 8);

  const canonicalRequest = `${method}\n/${objectKey}\n\nhost:${host}\nx-amz-content-sha256:${crypto.SHA256(
    data
  ).toString()}\nx-amz-date:${currentDate}\n\nhost;x-amz-content-sha256;x-amz-date\n${crypto.SHA256(
    data
  )}`;

  const credentialScope = `${date}/${AWS_REGION}/s3/aws4_request`;
  const stringToSign = `AWS4-HMAC-SHA256\n${currentDate}\n${credentialScope}\n${crypto.SHA256(
    canonicalRequest
  ).toString()}`;

  const signingKey = getSignatureKey(
    AWS_SECRET_KEY,
    date,
    AWS_REGION,
    's3'
  );
  const signature = crypto.HmacSHA256(stringToSign, signingKey).toString();

  const url = `https://${host}/${objectKey}`;
  const headers = {
    'x-amz-content-sha256': crypto.SHA256(data).toString(),
    'x-amz-date': currentDate,
    Authorization: `AWS4-HMAC-SHA256 Credential=${AWS_ACCESS_KEY}/${credentialScope}, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=${signature}`,
    'Content-Type': contentType,
  };

  try {
    // await superagent
      
    const response = await fetch(url, {
      method,
      headers,
      body: data,
    });

    if (response.ok) {
      console.log(`Successfully uploaded object: ${objectKey}`);
    } else {
      console.error('Failed to upload object:', response.statusText);
    }
  } catch (error) {
    console.error('Error uploading object:', error.message);
  }
}

// Example usage:
uploadObjectToBucket(bucketName, objectKey, data);

