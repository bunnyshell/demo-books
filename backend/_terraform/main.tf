provider "aws" {}

resource "aws_s3_bucket" "demo_bunnyshell_books" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_acl" "demo_bunnyshell_books_acl" {
  bucket = aws_s3_bucket.demo_bunnyshell_books.bucket

  grant {
    type        = "Group"
    uri         = "http://acs.amazonaws.com/groups/global/AllUsers"
    permissions = ["READ"]
  }
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
