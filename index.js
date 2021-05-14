#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');

function make_data(m) {
    let x = [];
    let y = [];
    for(let i = 0.0; i <= 20.0; i++) {
        x.push(i/10.0);
        y.push(Math.pow(m, i/10.0));
    }
    return [x, y];
}

function print_data_as_csv(x, y) {
    let csv_string = "";
    for(let i = 0; i < x.length; i++) {
        csv_string += `${x[i]},${y[i]}\n`;
    }
    return csv_string;
}

function load_file(filename) {
    const data = fs.readFileSync(filename, 'utf8').trim().split('\n');
    let x = [];
    let y = [];
    for(let i = 0; i < data.length; i++) {
        const split_row = data[i].split(',');
        x.push(split_row[0]);
        y.push(split_row[1]);
    }
    return [x, y];
}

function compare_to_default(x, y) {
    let diff_y = [];
    for(let i = 0; i < x.length; i++) {
        diff_y.push(Math.abs(y[i] - Math.pow(1.5, x[i]/10.0)));
    }
    return [x, diff_y];
}

yargs
    .scriptName("example-test")
    .usage('$0 <cmd> [args]')
    .command('make-data [m]', "prints csv-format string for m^x for values of x from 0 to 2 in increments of 0.1", (yargs) => {
        yargs.positional('m', {
            type: 'number',
            default: '1.5',
            describe: 'the base number for the exponential function that will generate the data'
        })
    }, function (argv) {
        const data = make_data(argv.m);
        console.log(print_data_as_csv(data[0], data[1]));
    })
    .command('compare [file]', "prints a csv-format string for differences at each x between values in file and values for 1.5^x", (yargs) => {
        yargs.positional('file', {
            type: 'string',
            describe: 'the file to read the data to compare from'
        })
    }, function (argv) {
        const data = load_file(argv.file);
        const diff = compare_to_default(data[0], data[1]);
        console.log(print_data_as_csv(diff[0], diff[1]));
    })
    .help()
    .argv