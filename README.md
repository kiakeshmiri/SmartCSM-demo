# SmartCSMChallange

This project is a demo about the followings:

- WebApi.
- TypeScript.
- Javascript.
- LinkedList.
- Advanced Javascript array manipulation.
- RxJs.
- Anguilar Material responsive UI.
- Observable subscription concepts.

However this project is so small that does not make sense to build routing, lazy loading or NGRX. I tried to build a platform for lazy loading if needed in future. As you go through source, some concept may look too advanced for this scale of project but that was my intention to display coding skills.

## Development server

run 'npm run start', this will launch webapi server whicj is exposing 2 Get api by passinh games.json and participants.json without any manipulation.

cd smartCSM-challange then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

cd smartCSM-challange then then run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build with ahead of time option

cd smartCSM-challange then run `ng build --prod --aot` to execute build the application in production mode and enhance the performance by ahead of time compilation.

This will generate the files in dist folder which later will be located by Weppi server (fastify) and will be served as static files. Navigate to `http://localhost:3000/`

## run in production mode

RUN 'npm run start'

