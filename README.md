# inventory.etiennethompson.com

An inventory system to help stay organized.

## Purpose:

This web app is supposed to help people stay organized by allowing people to take an inventory of their stuff and know where things are because of it.

## How it works:

The system works similarly to a file system where users can create different folders and items. These folders and items reference real world items. Folders are meant to represent a container of some kind, such as a box or room. Items are meant to represent the things you actually want to find. You put items within a nested folder structure to more easily find those items. The organization of items within the system is entirely up to the user, and not defined by the system itself.

#### An example of organization:

Let's say you have a box of yarn in your bedroom closet. An example hierarchy you can create within your system is:

- Apartment -> Bedroom -> Closet -> Yarn Box -> Red Yarn

When traversing your system later, it will be a lot easier to know where the red yarn is because it's been organized within the system.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
