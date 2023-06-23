provider "aws" {}

resource "aws_s3_bucket" "demo_bunnyshell_books" {
  bucket = var.bucket_name
  acl = "public-read"
}

resource "aws_s3_bucket_cors_configuration" "demo_bunnyshell_books_cors" {
  bucket = aws_s3_bucket.demo_bunnyshell_books.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
