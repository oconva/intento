# Contributing Guidelines

Thank you for your interest in contributing to the Intento project! We welcome contributions from the community to help improve the project and make it even better. Before you get started, please take a moment to review the following guidelines.

## Getting Started

To contribute to the Intento project, please follow these steps:

1. Fork the repository.

   Click the "Fork" button at the top of the repository to create a copy of the project in your GitHub account.

2. Create a clone of the forked repository to add your changes to it.

   Use the `git clone` command to create a local copy of your forked repository on your machine.

3. Create a new branch for your contribution.

   Use the `git checkout -b` command to create a new branch and start making changes.

4. Make your changes or additions.
5. Test your changes to ensure they work as expected.

   You can use the `pnpm predeploy` command. This command will perform following in order: linting, code formatting, compilation and testing.

   Testing may involve the use LLM model. So, you may have to setup environment variables correctly before being able to run tests locally. To learn more check [Setup Environment Variables](https://qvikchat.pkural.ca/getting-started#setup-environment-variables).

6. Commit your changes and push them to your forked repository.
7. Submit a pull request to our main repository. Be sure to include a detailed description of your changes.

## Code Style

Although not strictly, Intento follows the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) as much possible to maintain consistency and readability.

Once you are done with your changes, simply run the `pnpm lint` and `pnpm format` commands to ensure that your code is properly formatted and adheres to the style guide.

Please make sure to adhere to the following guidelines:

- Use meaningful variable and function names.
- Indent code using spaces, not tabs. Use prettier to format your code if possible.
- Follow the naming conventions for files, classes, functions, and variables.
- Use single quotes for strings.
- Use kebab-case for file names and folder names.
- Use camelCase for variable names and function names.

## Comments and Documentation

When contributing to the Intento project, please ensure that your code is well-documented and includes comments extensively. This will help other developers understand your code and make it easier to maintain in the future. Code changes without proper documentation may not be accepted.

## Intento Documentation

If you are contributing to the Intento project, please ensure that your changes are reflected in the official Intento documentation. Check the [Intento-docs repository](https://github.com/oconva/intento-docs) for the documentation and make the necessary changes to reflect your contributions.

## Reporting Issues

If you encounter any issues or bugs while using our project, please report them by following these steps:

1. Check if the issue has already been reported by searching our issue tracker.
2. If the issue hasn't been reported, create a new issue and provide a detailed description of the problem.
3. Include steps to reproduce the issue and any relevant error messages or screenshots.

## Pull Request Guidelines

When submitting a pull request, please ensure the following:

1. Provide a clear and descriptive title for your pull request.
2. Include a detailed description of the changes you have made.
3. Reference any related issues or pull requests.
4. Make sure your code passes all tests and status checks.
5. Keep your pull request focused on a single feature or bug fix.

## Code of Conduct

We expect all contributors to adhere to our code of conduct. Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

Thank you for your contributions and helping us improve our project!
