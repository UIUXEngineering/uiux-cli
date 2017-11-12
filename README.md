# UIUX CLI

Node utility app to generate templates, and common tasks.

#### Quick links 

[IX Material](https://github.com/UIUXEngineering/ix-material)   
[IX Docs](https://github.com/UIUXEngineering/ix-material.angular.io)


### Install

```bash

    npm install -g @uiux/cli
    
```


### Generate App Component Module

Path will default to ./src/app/

```bash

    ix g component [  name ] [ path ]
    
```

### Generate Material Component

Path will default to ./src/lib/

```bash

    ix g material [  name ]
    
```

### Generate CDK

Path will default to ./src/cdk/

```bash

    ix g cdk [ name ]
    
```



### build

This will launch the typescript compiler and watch for file changes

```bash
    yarn build
```

### publish to npm

```bash
    npm publish
```
