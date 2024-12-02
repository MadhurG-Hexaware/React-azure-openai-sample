# Contributing to Voice Chat with Azure

We'd love your help! Contributions of any kind are welcome. Whether you have improvements, bug fixes, or new features, please follow these guidelines.

## Getting Started

1. **Fork the Repository**: Click on the "Fork" button at the top right corner of this repository.
2. **Clone Your Fork**: Clone the forked repository to your local machine using the following command:

    ```sh
    git clone https://github.com/your-username/voice-chat-azure.git
    cd voice-chat-azure
    ```

3. **Create a New Branch**:

    ```sh
    git checkout -b feature/my-new-feature
    ```

4. **Make Your Changes**: Implement your feature or fix the bug.

5. **Commit Your Changes**:

    ```sh
    git add .
    git commit -m "Add my new feature"
    ```

6. **Push to Your Fork**:

    ```sh
    git push origin feature/my-new-feature
    ```

7. **Open a Pull Request**: Go to the original repository on GitHub, click on the "Pull Requests" tab, and click "New Pull Request". Select your branch and create the pull request.

## Code Style

Follow these guidelines for consistent code style:

- Use `Prettier` for code formatting.
- Adhere to [ESLint](https://eslint.org/) rules.

You can run these tools locally to ensure your changes are formatted correctly:

```sh
npm run lint
# or
yarn lint
```

## Testing

Make sure all tests pass before submitting a pull request. You can run the tests using:

```sh
npm test
# or
yarn test
```

## Documentation

Update any relevant documentation, such as `README.md`, if your changes affect how users interact with the project.

## Issues and Bugs

If you encounter any issues or bugs, please create an issue in the repository. Provide detailed information to help us understand and reproduce the problem.

## License

By contributing to this project, you agree to the [MIT License](LICENSE).

Thank you for your contributions!