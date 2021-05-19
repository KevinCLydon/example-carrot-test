# carrot-example-test
This repository contains an example test to be used as reference for designing tests when using [CARROT](https://github.com/broadinstitute/carrot) and the [CARROT CLI](https://github.com/broadinstitute/carrot_cli).

## What's in this repository?
### The example application
The example test uses a simple [Node](https://nodejs.org/en/) application with two commands:

`example-test make-data [a] [b]` prints 20 x,y coordinate pairs for values of x in the range [0,2] in increments of 0.1 supplied to the function `y = ab^x`

`example-test compare [file]` accepts a csv file containing output from `make-data` and prints prints 20 x,y coordinate pairs for values of x in the range [0,2] in increments of 0.1, where `y = |2^x - file(x)|` where file(x) is the y value paired with x within the file.

### The test config
The `carrot-test-config` directory contains a file called `carrot_commands.txt` which lists the series of CARROT CLI commands to use to prepare and run the example test, along with all the necessary files to do so.

## Using this repository
First, ensure you have access to a running [CARROT](https://github.com/broadinstitute/carrot) server with software building functionality and reporting functionality configured, and that you have downloaded and installed the [CARROT CLI](https://github.com/broadinstitute/carrot_cli) and configured it to point to that server.

Then, download the contents of carrot-test-config and run the commands in the `carrot_commands.txt` file using CARROT CLI, following the instructions in the comments.