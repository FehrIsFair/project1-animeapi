# Anime Page API (Now with API Calls!)

## Forking/Cloning Info

This project was a school assignment, copying it for academic use is prohibited.

## Features

### A fast and simple way to display info on the anime you want to watch.

# Known Issues

- This is more an issue with the API that gets the Anime info and how it gets it. It scrapes the website myanimelist.net to get the info it presents in the app. That site, upon further research just released a public beta this year without me finding out about it. It's too late to switch over--that and the documentation site is unusable with a bug that won't let you scroll and just sends you back to the top.

- No error messages for forms. Like login and sign up. There's a bit of logic missing that I have no idea what to do to fix it.

# Fixed Issues

- Ghibli Bug fixed. Added conditional rendering to the adaptation parts

# Documentation

## IMPORTANT

You must have an account to use this app. It connects via firebase and you must provide the auth keys required from firebase. Email and Password and Google Accounts are supported.

## Commands

- yarn/npm start

"yarn start" just starts the dev environment. Nothing fancy here.

THERE ARE NO BUILD COMMANDS. This is a web-app. If you wish to deploy this app you must deploy to a service like Netlify or Digital Ocean.

## Components

### Login.js and SignUp.js

Login and SignUp.js are equal parts the same and different. One just logs you in with an existing account, and the other lets you create an account. They are structured the exact same way and don't do much other than redirect you once everything has been validated correctly.

### Search.js

This is where we search for anime.

Using the search bar, you can type the name of an anime you liked and either hit enter or search. This pulls up the first 20 results and is filtered so nothing NSFW shows up. Though, as mentioned above its not perfect and not all titles will be the first title in the search. But I've done my best to ensure this works as intended. You may also add the anime to a favorite list.

### Anime.js

Clicking the title of a search result in Search.js will bring you to this page. It contains a more detail look at the anime in question. And like in search, you can also add the anime to a favorite list.

### FavoriteList.js

FavoriteList.js isn't perfect. If I had more time I'd make it so that it stores info in firebase and retrieves it based on the user that is currently logged in. But for now I have to deal with temp lists.

Favorite list congregates the anime the user favorited and lists them here. They aren't in any particular order, but you can activly remove and immediately get a refreshed list.

### Navigation.js

Navigation.js holds all the logic for manuvering around the sight. It conditinally renders based on if the user is logged in or not.

### Authentication.js

Authentication.js is where the context and all the logic of the previous components is stored. It's also how the user authenticates. Again, as stated above, the authentication uses firebase. You will need to make a .env file with the appropriate keys to ensure the app works correctly.
