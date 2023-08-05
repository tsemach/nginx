import requests
import datetime
import hashlib
import hmac
import base64

# AWS credentials
aws_access_key = 'YOUR_ACCESS_KEY'
aws_secret_key = 'YOUR_SECRET_KEY'

# S3 bucket and object information
bucket_name = 'your-bucket-name'
object_key = 'your-object-key'

# S3 endpoint URL for your AWS region
s3_endpoint = 'https://s3.amazonaws.com'  # Update with the correct endpoint for your region

# HTTP method and content type
http_method = 'GET'
content_type = ''

# Current timestamp for the request
timestamp = datetime.datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')

# Generate the canonical request
canonical_request = f"{http_method}\n/{bucket_name}/{object_key}\n\nhost:{s3_endpoint.replace('https://','')}\n\nhost\n"

# Generate the string to sign
string_to_sign = f"AWS4-HMAC-SHA256\n{timestamp}\n{timestamp[0:8]}/{aws_region}/s3/aws4_request\n{hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()}"

# Generate the signing key
signing_key = hmac.new(("AWS4" + aws_secret_key).encode('utf-8'), timestamp[0:8].encode('utf-8'), hashlib.sha256)
signing_key = hmac.new(signing_key.digest(), aws_region.encode('utf-8'), hashlib.sha256)
signing_key = hmac.new(signing_key.digest(), b's3', hashlib.sha256)
signing_key = hmac.new(signing_key.digest(), b'aws4_request', hashlib.sha256)

# Calculate the signature
signature = hmac.new(signing_key.digest(), string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()

# Construct the headers
headers = {
    'Authorization': f"AWS4-HMAC-SHA256 Credential={aws_access_key}/{timestamp[0:8]}/{aws_region}/s3/aws4_request, SignedHeaders=host, Signature={signature}",
    'x-amz-date': timestamp,
}

# Make the request
response = requests.get(f"{s3_endpoint}/{bucket_name}/{object_key}", headers=headers)

# Handle the response
if response.status_code == 200:
    print("Object fetched successfully.")
    print(response.text)
else:
    print(f"Error: {response.status_code} - {response.text}")

