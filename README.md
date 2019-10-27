# SmartCSM Code Challange

This project is a demo about the followings:

- WebApi.
- TypeScript.
- Javascript.
- LinkedList.
- Advanced Javascript array manipulation.
- RxJs.
- Anguilar Material responsive UI.
- Observable subscription concepts.
- class vs interface in ES6.
- HttpClient 

However this project is so small that does not make sense to build routing, lazy loading or NGRX. I tried to build a platform for lazy loading if needed in future. As you go through source, some concept may look too advanced for this scale of project but that was my intention to display coding skills.

## Inital Setup

This application was build based on latest version of Anguler (v8.2.11). If you are interested to use angular cli and change the application please follow https://angular.io/guide/setup-local

While you are in root folder (smartCSM-demo), run npm install. This will install all dependecies for fastify web server and provide run script (i.e. npm run start)

## Development server

run 'npm run start', this will launch webapi server which is exposing 2 Get api by passinh games.json and participants.json without any manipulation.

cd 'smartCSM-challange/' then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

cd 'smartCSM-challange/' then then run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build with ahead of time option

cd 'smartCSM-challange/' then run `ng build --prod --aot` to execute build the application in production mode and enhance the performance by ahead of time compilation.

This will generate the files in dist folder which later will be located by Weppi server (fastify) and will be served as static files. 

## Run in production mode

run 'npm run start'. Navigate to `http://localhost:3000/`. I have included dist folder in the github so you won't need to run above step in order to run the server and application mode in production mode.

