# Estimating SARS-CoV-2 infection rates in Finland

## Disclaimer

This script was created to pseudoscientifically prove that we are all doomed
and should prepare for the coming apocalypse. Or just as an interesting
experiment in playing with a nice calculator app.

The author has no training in math, statistics or medical research and is
therefore TOTALLY qualified to make wild predictions on the internet just like
everyone else.

## How the equation is generated

The equation is generated simply by entering the infection rates to a HP Prime
Pro calculator simulator using the "Statistics 2Var" application.
The first column is day number 1..N (Day 1 is 2020-02-26) and the second column
is the number of confirmed cases for that day.
The app generates an equation closest to the date, which is used by this script
to generate the estimates.

## Updates

This repository may get updates when more data accumulates.

## Most recently generated estimates

```
== Estimated SARS-CoV-2 infections in Finland ==
* Using data from 2020-03-23
date		total	new
2020-03-21	539	+0
2020-03-22	605	+66
2020-03-23	675	+69 today
2020-03-24	747	+72
2020-03-25	822	+74
2020-03-26	899	+76
2020-03-27	977	+78
2020-03-28	1057	+79
2020-03-29	1138	+80
2020-03-30	1218	+80
2020-03-31	1298	+80
2020-04-01	1377	+79
2020-04-02	1455	+77
2020-04-03	1530	+74
2020-04-04	1602	+71
2020-04-05	1669	+67
2020-04-06	1732	+63
```

## Data source
Using the open data provided by [HS-Datadesk](https://github.com/HS-Datadesk/koronavirus-avoindata)

## Producing input data for the app

```
curl -o data.json https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData
jq -r '.confirmed[].date' data.json | cut -c1-10 | sort | uniq -c | awk '{sum=sum+$1; print sum " " $1 " " $2}'
```

jq command output: (total, new, date)

```
1 1 2020-01-29
2 1 2020-02-26
3 1 2020-02-28
6 3 2020-03-01
7 1 2020-03-02
12 5 2020-03-05
15 3 2020-03-06
19 4 2020-03-07
24 5 2020-03-08
33 9 2020-03-09
40 7 2020-03-10
65 25 2020-03-11
111 46 2020-03-12
157 46 2020-03-13
227 70 2020-03-14
243 16 2020-03-15
275 32 2020-03-16
315 40 2020-03-17
357 42 2020-03-18
398 41 2020-03-19
448 50 2020-03-20
521 73 2020-03-21
626 105 2020-03-22
686 60 2020-03-23
```

The first data point is skipped in the calculations as an outlier.
