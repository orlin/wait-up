# wait-up

[![NPM](https://nodei.co/npm/wait-up.png?mini=true)](https://www.npmjs.org/package/wait-up)

Waits for http servers to come up with a preferably `200` ok status.
Thanks to [`on-up`](https://github.com/orlin/on-up).

## Use by Example

* $ `wait-up` will try / wait to get `http://localhost`
* $ `wait-up http://127.0.0.1:8080/location` - takes a provided uri
* $ `wait-up /another/location` with `http://localhost` assumed by `on-up`

The script will exit with statuscode `0`,
only if a `200` response status code was got.
Otherwise it will be an error - `1`.

## License

[MIT](http://orlin.mit-license.org)
