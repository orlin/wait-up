# wait-up

Waits for http servers to come up with a preferably `200` ok status.

## Use by Example

$ `wait-up` will try / wait to get http://localhost
$ `wait-up http://127.0.0.1:8080` gets the provided uri

The script will exit with statuscode `0`,
only if a `200` response status code was got.
Otherwise it will be an error - `1`.

## License

[MIT](http://orlin.mit-license.org)
