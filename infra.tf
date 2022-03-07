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

module "basic-deployment" {
  source  = "jdevries3133/basic-deployment/kubernetes"
  version = "0.0.9"

  app_name  = "ea_music"
  container = "jdevries3133/ea_music:0.1.0"
  domain    = "empacadmusic.org"
}
