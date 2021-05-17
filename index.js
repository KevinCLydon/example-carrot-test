#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');

function make_data(a, b) {
    let x = [];
    let y = [];
    for(let i = 0.0; i < 2.1; i+=0.1) {
        x.push(i);
        y.push(a * Math.pow(b, i));
    }
    return [x, y];
}

function print_data_as_csv(x, y) {
    let csv_string = "";
    for(let i = 0; i < x.length; i++) {
        csv_string += `${x[i].toFixed(1)},${y[i]}\n`;
    }
    return csv_string;
}

function load_file(filename) {
    const data = fs.readFileSync(filename, 'utf8').trim().split('\n');
    let x = [];
    let y = [];
    for(let i = 0; i < data.length; i++) {
        const split_row = data[i].split(',');
        x.push(parseFloat(split_row[0]));
        y.push(parseFloat(split_row[1]));
    }
    return [x, y];
}

function compare_to_default(x, y) {
    let diff_y = [];
    for(let i = 0; i < x.length; i++) {
        diff_y.push(Math.abs(y[i] - Math.pow(2.0, x[i])));
    }
    return [x, diff_y];
}

yargs
    .scriptName("example-test")
    .usage('$0 <cmd> [args]')
    .command('make-data [a] [b]', "prints csv-format string for ab^x for values of x from 0 to 2 in increments of 0.1", (yargs) => {
        yargs.positional('a', {
            type: 'number',
            default: '1',
            describe: 'the a in ab^x'
        }),
        yargs.positional('b', {
            type: 'number',
            default: '1.5',
            describe: 'the b in ab^x'
        })
    }, function (argv) {
        const data = make_data(argv.a, argv.b);
        console.log(print_data_as_csv(data[0], data[1]));
    })
    .command('compare [file]', "prints a csv-format string for differences at each x between values in file and values for 2^x", (yargs) => {
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