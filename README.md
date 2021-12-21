# AWS Lambda Powertools (TypeScript)
![Tests](https://github.com/awslabs/aws-lambda-powertools-typescript/workflows/Test/badge.svg?branch=main)
## Testing
The repo uses JEST tests, these can be run using

`npm run lerna-test`

Which will also generate coverage reports, and fail if the coverage is below the threshold.

## Code Styling and Linting
### Linting
Linting standards adhear to [tslint:recommended](https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts).

Please ensure you run `npm run lerna-lint` before comiting to check for styling errors

### Formating

The repo is setup using  [Prettier](https://prettier.io/). This will automatically make syntactic changes to files to
align them with the style guides. Please run this before creating a PR, and commit the changes.

`npm run lerna-format`

## Credits

* Structured logging initial implementation from [aws-lambda-logging](https://gitlab.com/hadrien/aws_lambda_logging)
* Powertools idea [DAZN Powertools](https://github.com/getndazn/dazn-lambda-powertools/)

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file.