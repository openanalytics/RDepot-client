```
 _____   ____              _
| __  | |    \ ___ ___ ___| |_
|    -| |  |  | -_| . | . |  _|
|__|__| |____/|___|  _|___|_|
                  |_|

```

# RDepot

Open Source Enterprise Management of R and Python Repositories

## Running application

### Backend (for frontend development)

To develop the frontend with a live preview, you’ll need the backend up and running first.

Start by cloning the backend repository:

```
https://github.com/openanalytics/RDepot.git
```

Once cloned, switch to the `develop` branch and pull the latest changes (including Git LFS files):

```
git lfs pull
```

Next, build the Maven project. This will clean the project, compile it, and prepare everything needed for running alongside frontend project:

```
mvn clean pre-integration-test
```

Now move to the Docker setup directory:

```
cd rdepot-app/src/test/resources/
```

Pull and build the required Docker images:

```
docker compose pull && docker compose build
```

Then start the Docker environment:

```
docker compose up
```

After the containers are running, restore the database. Navigate to the scripts directory:

```
cd rdepot-app/src/test/resources/scripts
```

Run the restore script:

```
sh restore.sh
```

With the backend ready, switch to the frontend project.

### Theme configuration (optional)

In development mode, theme variables are loaded from `.env.local` (gitignored). Copy the template to get started:

```
cp .env.local.template .env.local
```

You can then customize navbar title, colours, logo, and other theme settings in `.env.local`. In production (Docker), these are configured via `config.yaml` instead.

Install frontend dependencies:

```
npm install
```

Start the development server on port `3001`:

```
npm run dev -- --port 3001
```

Once everything is up, the live preview will be available at:

```
http://localhost:3001/
```

### End-to-end testing environment

For E2E tests, **only the frontend project is required**.

Run the setup script. This prepares all containers and restores the test database:

```
npm run test:e2e:setup
```

Once setup is complete, you can run the end-to-end tests:

```
npm run test:e2e
```

The built frontend used during E2E testing can be accessed at:

```
http://192.168.51.20/
```

If you want to shut down the containers and clean your environment use:

```
npm run test:e2e:cleanup
```

---

Learn more at https://rdepot.io

#### (c) Copyright Open Analytics NV, 2012-2026 - Apache License 2.0
