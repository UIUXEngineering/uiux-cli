# Sunpower CLI

Node utility app to generate templates, and common tasks.

#### Quick links ( TODO update urls once in Sunpower Account )

[SunPower Material](https://bitbucket.org/jerryorta-dev/sunpower-material) 
[Sunpower Docs](https://bitbucket.org/jerryorta-dev/sunpower-material-io)


### Install

```bash

    npm install -g @sunpower/cli
    
```


### Generate App Component Module

Path will default to ./src/app/

```bash

    sp g component [  name ] [ path ]
    
```

### Generate Material Component

Path will default to ./src/lib/

```bash

    sp g material [  name ]
    
```

### Generate CDK

Path will default to ./src/cdk/

```bash

    sp g cdk [ name ]
    
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
