import * as cdk from 'aws-cdk-lib/core';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class GithubOidcStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // 1. Tell AWS to trust tokens signed by GitHub Actions
        const provider = new iam.OidcProviderNative(this, 'GithubProvider', {
            url: 'https://token.actions.githubusercontent.com',
            clientIds: ['sts.amazonaws.com'],
        });

        // 2. A role that ONLY main-branch workflows of this repo can assume
        const deployRole = new iam.Role(this, 'GithubDeployRole', {
            roleName: 'aws-test-app-github-deploy',
            assumedBy: new iam.WebIdentityPrincipal(provider.oidcProviderArn, {
                StringEquals: {
                    'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
                    'token.actions.githubusercontent.com:sub':
                        'repo:stef-red@130202086/aws-test-app@1467267864:ref:refs/heads/main',
                },
            }),
            maxSessionDuration: cdk.Duration.hours(1),
        });

        // 3. The role may only hand work to CDK's bootstrap roles, nothing else
        deployRole.addToPolicy(new iam.PolicyStatement({
            actions: ['sts:AssumeRole'],
            resources: [`arn:aws:iam::${this.account}:role/cdk-hnb659fds-*`],
        }));

        new cdk.CfnOutput(this, 'DeployRoleArn', { value: deployRole.roleArn });
    }
}