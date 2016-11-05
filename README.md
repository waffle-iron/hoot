# hoot
[![Known Vulnerabilities](https://snyk.io/test/github/vulpino/hoot/7114b645e1cbd83752fb5d43f00b8c8634435a85/badge.svg)](https://snyk.io/test/github/vulpino/hoot/7114b645e1cbd83752fb5d43f00b8c8634435a85)
[![Join the chat at https://gitter.im/hootrocks](https://badges.gitter.im/hootrocks.svg)](https://gitter.im/hootrocks?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Hoot is a college application app, built to help students apply to the best
assortment of colleges possible. For more information on what hoot is, visit
[the site](https://hoot.rocks). This document will go over technical details.

## The stack

This is what hoot is composed of.

On the front end:
- **React:** The foundation of the web app, react and JSX are used on the front
  end to render the app.
- **Redux:** Redux is used with react to manage the state of the app.
- **Webpack:** Webpack is used to pack the app into a small, cubical shape. It
  also allows us to host a hot-reloading version of the app in development.
- **Babel:** Babel is used to transpile the JSX and stage-2 features we use.
- **SASS:** SASS is used because it's 2016, and we're already using webpack, and
  writing CSS sucks.

On the back end:
- **Firebase:** Firebase hosts all the data, and handles all of the auth system.
  I did this because hosting servers is hard.

### Wait Firebase isn't FOSS

Yeah, whatever, programming is hard. Listen, all the data stored on hoot is free
to access, and additionally I plan on releasing all the data contained within as
JSON documents so that other programs can use what I have gathered, because I'm
a big believer in openness, rah rah rah. If that isn't "open source" enough for
you I don't care. I'm just here to make cool stuff.

## Developing

To set up a local development environment:

```
git clone https://github.com/vulpino/hoot
cd hoot
npm i
node start-hot.js
```

And now, open up `localhost:3000` in your web browser of choice, and reflect.

## Deploying

Assuming you have access to the firebase project:

```
mkdir deploy
webpack --config webpack.config.production.js
firebase deploy
``` 

## Contributing

You could just pick a GitHub issue, fork, and try to fix it. But I'd encourage
you to join me in the gitter.im room linked above, so that we can talk about the
different issues being tracked and what is the most important right now. I am
friendly people! (I can't vouch for anyone else except a few of my friends, 
though.)

### Overv.io

I track issues in [overv.io](https://overv.io/vulpino/hoot/board/). Issues that
are queued I'm looking to have In Progress in the next week, and I should only
have two issues In Progress at a time. If we gather more regular contributors,
I'll be able to assign them work and have more issues In Progress, and that
means we'll be able to hold a longer queue and develop faster. If you want to
help, I would really like that you pick an issue in the queue, comment on it,
and I'll assign it to you so you can work on it. Thank you!

### Style Guide

Please abide by [StandardJS](http://standardjs.com).

```
npm install -g standard 
standard
```

The website details different methods for using it, if the command line just
doesn't work for you.
