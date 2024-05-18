# React Native Application

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Folder Structure](#folder-structure)
4. [Configuration](#configuration)

## Introduction

This is a basic React Native application template. It has a defined folder structure and a config file for setting up the base URL.

## Getting Started

Here are the steps to run the application:

1. **Clone the Repository**
   ```
   git clone https://github.com/kiranrega/rnshiftbookingapp.git
   ```
2. **Install the Dependencies**

```
   cd your-repo-name
   npm install
   //or
   yarn install
```

3. **Run the Application**

```
   For Android
   npx react-native run-android

   For IOS:
   npx react-native run-ios
```

## Folder Structure

rnshiftbookingapp/

```
├── **tests**
├── android
├── ios
├── node_modules
├── src
│ ├── components
│ ├── screens
│ ├── hooks
│ └── utils
├── .gitignore
├── App.js
├── index.js
├── package.json
└── README.md
```

## Configuration

To set the base URL for the API requests, you need to add it to the config.js file:

```
export const BASE_URL = 'your-api-url',
```

Replace 'your-api-url' with your actual API URL.
