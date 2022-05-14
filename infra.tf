terraform {

  backend "s3" {
    bucket = "my-sites-terraform-remote-state"
    key    = "ea_music_state"
    region = "us-east-2"
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.7.1"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.4.1"
    }

  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

variable "aws_access_key_id" {
  type = string
  sensitive = true
}

variable "aws_secret_access_key" {
  type = string
  sensitive = true
}

data "external" "git_describe" {
  program = ["sh", "scripts/git_describe.sh"]
}

resource "random_password" "session_secret" {
  length = 16
  special = false
}

module "basic-deployment" {
  source  = "jdevries3133/basic-deployment/kubernetes"
  version = "0.2.0"

  app_name  = "ea-music"
  container = "jdevries3133/ea_music:${data.external.git_describe.result.output}"
  domain    = "empacadmusic.org"

  extra_env = {
    STUDENT_DATA = file("./student_data.json")
    AWS_ACCESS_KEY_ID = var.aws_access_key_id
    AWS_SECRET_ACCESS_KEY = var.aws_secret_access_key
    SECRET_KEY = random_password.session_secret.result
  }
}
