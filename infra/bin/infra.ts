#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { InfraStack } from '../lib/infra-stack';
import { GithubOidcStack } from '../lib/github-oidc-stack';

const app = new cdk.App();
const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };

new InfraStack(app, 'HelloStack', { env });
new GithubOidcStack(app, 'GithubOidcStack', { env });