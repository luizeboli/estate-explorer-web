# Estate Explorer

Welcome to the frontend of the Estate Explorer app. This is a proof of concept for building an application using Wordpress as a headless CMS. You can check the backend [here](https://github.com/luizeboli/estate-explorer-wp) and the live version [here](https://estate-explorer.felicio.dev).

## Technologies

This project has been developed using [NextJs](https://github.com/vercel/next.js/) with the new stable app folder.

For the styling solution I chose [Linaria](https://github.com/callstack/linaria), which is a zero runtime css in js solution. Unfortunately theres no official support for the NextJs framework, so I had to use the third party library [next-with-linaria](https://github.com/dlehmhus/next-with-linaria). 

This library is the one which supports NextJs 13 (app folder) and Linaria v4, but its still in development, so I had some issues that delayed the development, like [this one](https://github.com/dlehmhus/next-with-linaria/issues/17), and also the fact that sometimes the styles don't update on the page when saving the file.

I could've used [Tailwind](https://github.com/tailwindlabs/tailwindcss) as it's [recommended by NextJs team](https://nextjs.org/docs/pages/building-your-application/styling/tailwind-css) and pretty easy to work with, but I wanted to experiment with Linaria as it's similar to a solution that I'm used to: [styled components](https://github.com/styled-components/styled-components), with the advantage of being zero runtime (no transpilation involved).

For testing I chose a well-known robust and stable setup: [Cypress](https://cypress.io) (E2E), [Jest](https://jestjs.io) + [RTL](https://testing-library.com) (Unit/Integration). As this is a PoC I decided to write tests for the main features, not focusing on a lot of tests with high coverage.

## Getting Started

1. Install the dependencies
```sh
npm install
```
2. Make a copy of the `.env.example` file, name it `.env.local` and fill with your values.

| Variable                 | Description                          |
|--------------------------|--------------------------------------|
| NEXT_PUBLIC_WP_HOST_URL  | The REST API url of your Wordpress site (example: `http://site.local/wp-json/wp/v2`)|
| WP_IMAGES_HOST           | Only the host part of your site. This will be used to allow images for the next/image component (example: `site.local`).                                   |

3. Run the development server
```sh
npm run dev
```