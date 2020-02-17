# Dogsbook

Social network of people who love dogs. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You should to have installed Node.js +v12.16.0 and Postgres

### Installing

```shell
git clone https://yosamac@bitbucket.org/yosamac/dogsbook.git
cd dogsbook
npm i 
```

## Usage

### Development mode

```shell
npm start:dev
```

### Production mode

```shell
npm start
```


## General configuration

### Environment variables

| Name            | Description                                                                         | Format                         | Default                |
| --------------- | ----------------------------------------------------------------------------------- | ------------------------------ | ---------------------- |
| PORT            | The port this service will expose to other services                                 | Any valid port                 |  `3000`                |
| POSTGRES_HOST   | Database server                                                                     | `127.0.0.1`                    | `127.0.0.1`            |
| POSTGRES_PORT   | Database port                                                                       | Any valid positive number      | `5432`                 |
| POSTGRES_DB     | Database name                                                                       | `string`                       | `dogsbook`             |
| POSTGRES_USER   | Database user                                                                       | `string`                       | `sysadmin`             |
| POSTGRES_PASSWD | Database password                                                                   | `string`                       | `Sup3rS3cret@`         |
| LOG_LEVEL       | Logger level                                                                        | `STRING`                       | `DEBUG`                |


## Running the tests

### Unit tests - TODO

```shell
npm run test 
```

### Integration tests - TODO
```shell
npm run test
```

## Deployment

### Build production image
```shell
npm run build:pro
```

### Build development image
```shell
npm run build:dev-image
```

### TOD0

Add additional notes about how to deploy this on a live system


## Built With

* [Express](https://expressjs.com/en/4x/api.html) - The web framework used

## Authors 

* **Yosnier Samon M.** - *Initial work* - [My bitbucket](https://bitbucket.org/%7Be62d0967-5a38-43c2-aeca-098e3af45787%7D/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://bitbucket.org/yosamac/dogsbook/branch/master/tags). 

### Generate Release

```shell
npm run release
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
