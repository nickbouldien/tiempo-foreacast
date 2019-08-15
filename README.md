# Tiempo Forecast

> small weather app using react-native-web

## install

git clone the project and then:

```sh
cd tiempo-forecast
yarn install
```

### run

```sh
yarn ios
```

```sh
yarn android
```

```sh
yarn web
```

### lint

```sh
yarn lint
```

### test

```sh
yarn test
```

### deploy

```sh
yarn build
```
### TODOs:
- fix the app name (change to "tiempo-forecast" from "example")
- use constants for action types
- more complete/stricter typing
- styling!!
- formatting of data
- let user switch between using metric and imperial units
- cache/persist the data for x number of hours (3??) unless the user refetches the data
- extract the redux code out of the component files
- add refresh capability - https://facebook.github.io/react-native/docs/refreshcontrol.html
- add icons for different weather types
  