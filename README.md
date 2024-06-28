# Debricked: VS Code Extension

[![Build Status](https://github.com/debricked/VS-Code-extension/workflows/CI/badge.svg)](https://github.com/debricked/VS-Code-extension/actions)
[![Coverage Status](https://github.com/debricked/VS-Code-extension/badges/main/coverage.svg)](https://github.com/debricked/VS-Code-extension/coverage)

Welcome to the **Debricked: VS Code Extension** project! This extension integrates Debricked's capabilities directly into your Visual Studio Code environment, enhancing your development workflow with advanced features for security and dependency management.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Building](#building)
  - [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Footer](#footer)
- [Sidebar](#sidebar)
- [Contributors](#contributors)
- [Milestones](#milestones)

## Features

- **Dependency Analysis:** Automatically scans and analyzes your project's dependencies.
- **Security Alerts:** Provides real-time security alerts for known vulnerabilities.
- **License Compliance:** Ensures your project complies with open source licenses.
- **Integration with Debricked:** Seamlessly integrates with Debricked's services.

## Installation

To install the Debricked VS Code Extension, follow these steps:

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window.
3. Search for `Debricked`.
4. Click `Install` on the Debricked extension.

Alternatively, you can install it via the command line:

```sh
code --install-extension debricked.vscode-extension
```

## Usage
After installing the extension, you can start using it by:

1. Opening any project in VS Code.
2. The extension will automatically scan your project and provide dependency and security analysis in the VS Code interface.
3. Access detailed reports and recommendations from the Debricked panel in the Activity Bar.

## Development
### Prerequisites
Ensure you have the following tools installed:

- Node.js (version 14 or later)
- npm
- Visual Studio Code

### Setup
Clone the repository and install dependencies:

```sh
git clone https://github.com/debricked/VS-Code-extension.git
cd VS-Code-extension
npm install
```

### Building
To compile the extension, run:

```sh
npm run compile
```

The compiled files will be located in the dist folder.

### Testing
Run the tests using:

```sh
npm run test
```

Test coverage reports will be generated in the coverage folder.

## Contributing
We welcome contributions from the community! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.
6. For detailed guidelines, refer to our Contributing Guide.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Special thanks to the Debricked team for their support and contributions.
- Inspired by the Visual Studio Code Extension Guide.

## Contributors
We appreciate all the Contributors who have helped make this project better.

## Milestones
Check out our Milestones to see our project roadmap and upcoming features.
