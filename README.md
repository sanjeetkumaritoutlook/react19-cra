# using the Library components in React 19+ only
npm i react19-cra

import { MyButton, MyCard } from 'react19-cra'

In src/App.tsx or any component:

```
import React from 'react';
import { MyButton, MyCard } from 'react19-cra'; 

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <MyCard
        title="Hello Card"
        description="This card is from my custom library."
        image="https://picsum.photos/300/150"
        onClick={() => alert('Card clicked!')}
      >
        <MyButton
          label="Click Me"
          variant="primary"
          onClick={() => alert('Button clicked!')}
        />
      </MyCard>
    </div>
  );
};

export default App;
```


## Free models in India
https://aistudio.google.com/apikey

https://generativelanguage.googleapis.com/v1/models?key=YOUR_API_KEY 

https://ai.google.dev/gemini-api/docs/models

https://ai.google.dev/gemini-api/docs/rate-limits

https://ai.google.dev/gemini-api/docs/available-regions

google cloud console

https://console.cloud.google.

✔️Use different Google Cloud projects if you need separate quotas for each API key.
✔️ Monitor usage in Google Cloud Console → APIs & Services → Dashboard.
✔️ Restrict API keys to specific apps or IPs for security.

A Google Cloud project is created inside a Google Cloud account.

A single Gmail account (Google account) can own or manage multiple projects.

You can create multiple projects under the same Gmail, each with its own API keys and quotas.

Each project has its own separate billing, quotas, and API keys (unless they share the same billing account).


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

npx create-react-app react19-cra

# Create a New React App with TypeScript
Run the following command:

npx create-react-app react19-cra --template typescript

What happens here?
•	npx ensures you're using the latest Create React App version.
•	react19-cra is your project folder name.
•	--template typescript sets up TypeScript instead of JavaScript


React 19 - fluid-form : https://stackblitz.com/edit/react-ts-ymaezsrb?file=index.tsx

## Publish React component to npm registry as library
npm install --save-dev tsup typescript

Use tools like rollup or tsup to bundle your code.

Option: Use tsup (easier and faster)

Add a tsup.config.ts

Build script in package.json

"build": "tsup"

npm install -D @swc/core

tsup uses SWC (a fast JS/TS compiler) to support ES5

### gha vs npm publish

"build": "react-scripts build",

"build": "tsup",
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm login`

### `npm publish --access public`


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
