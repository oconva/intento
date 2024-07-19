# Intento

Open source intent recognition powered by Large Language Models(LLMs) and Retrieval Augmented Generation (RAG).

Built with the missin to make conversational AI more open and accessible to all. No need to spend thousands on empowering your apps with conversational AI and providing your users the ability to interact with your app using natural language. Using [QvikChat](https://github.com/oconva/qvikchat) and Intento you can build powerful, reliable and secure conversational AI services at almost no cost.

## Getting Started

1. Clone the repository:

```bash
git clone
```

2. Install the dependencies:

```bash
pnpm install
```

3. Compile the code and start the development server:

```bash
pnpm dev
```

To test the endpoint from terminal, you can use the `curl` command. Example below:

```bash
curl -X POST "http://127.0.0.1:3400/query" -H "Content-Type: application/json" -H "Authorization: a5zwhp0YlcRVkpnOXchIkL1lrmf0MPg24POM0kO6HcM=" -d '{"data": { "query": "add 4 litres milk?", "uid": "DI2UZuaTWjQPzVCRjzPW" } }'
```

## API Key

By default, the project uses an in-memory API key store, so you can get started with testing the core functionality right away. The keys present in the `data/irs/api-keys.json` file are loaded into this in-memory store.

## QvikChat

**QvikChat** is a [Firebase Genkit](https://github.com/firebase/genkit) and [LangChain](https://js.langchain.com/v0.2/docs/introduction/) based framework that provides you with a solid foundation to build powerful AI-powered chat service endpoints quickly and efficiently. It includes support for **multiple types of conversations (open-ended, close-ended)**, **chat history**, **response caching**, **authentication**, and **information retrieval using Retrieval Augmented Generation (RAG).**

[Get Started](https://qvikchat.pkural.ca/getting-started) | [Documentation](https://qvikchat.pkural.ca)

## QvikChat Starter Template

This project was scaffolded using the [QvikChat Starter Template](https://github.com/oconva/qvikchat-starter-template). It comes pre-configured with the following features:

- **QvikChat**: QvikChat installed and configured to start serving chat endpoints.
- **TypeScript**: TypeScript to allow you to write type-safe code efficiently.
- **ESLint**: ESLint to enforce code quality and consistency.
- **Prettier**: Prettier to format your code automatically and ensure consistent code style.
- **Jest**: Jest to run your tests and ensure your code works as expected.
- **GitHub Actions**: GitHub Actions to run your tests and lint your code automatically on every push.
- **SWC**: For faster and more efficient TypeScript compilation.
- **PNPM**: PNPM to manage your dependencies efficiently.

## Contributions

Contributions are welcome! Please refer to the [contribution guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues

If you encounter any issues or bugs while using QvikChat, please report them by following these steps:

1. Check if the issue has already been reported by searching our issue tracker.
2. If the issue hasn't been reported, create a new issue and provide a detailed description of the problem.
3. Include steps to reproduce the issue and any relevant error messages or screenshots.

[Open Issue](https://github.com/oconva/intento/issues)

```

```
