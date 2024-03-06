resource "aws_s3_bucket" "s3" {
  bucket = "testbucket-0306"
  acl = "private"
}