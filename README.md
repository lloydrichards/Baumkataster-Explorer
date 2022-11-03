# Lloyd's Baumkataster Explorer

[Live Website](https://baumkataster-explorer.vercel.app/)

Welcome to the Baumkataster Explorer.  This fullstack application is built as a coding assignment to explore my abilities in building an application with a medium sized dataset.

Baumkataster ZH → https://opendata.swiss/de/dataset/baumkataster

## GETTING STARTED

First, run the development server:

```bash
cs dashboard

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## LINKS

[Overview - Material UI](https://mui.com/material-ui/getting-started/overview/)

[Quickstart with TypeScript & SQLite](https://www.prisma.io/docs/getting-started/quickstart)

[Next.js 13](https://nextjs.org/blog/next-13)

## CONTENT

Lets kick this off!

For the IxT Coding assignment (Fullstack) I’m going to be writing my notes in Notion and later exporting to the `[README.md](http://README.md)` in the git repo. Here I’ll organize my thoughts and plans and then add additional comments inside the code itself to go over during the interview.

## The Assignment

Reading through the assignment, its mostly split between two components: a typed and public API for querying data, and a dashboard for interacting with the data through some kind of search/filter functionality.

### The API

For the API I’m going to use `Next.JS` as it offers a lot of out of the box configuration and will be deployed on the same instance as the dashboard, making the whole dev experience more smooth. Tech options:

- REST (simple, but returns stringified json)
- GraphQL (complex to setup, but typed with code gen)
- tRPC (clean modern approach, but lacking experience)

While I would love to overengineer a graphql endpoint for this, I think for time sakes, using a simple REST api and then using something like `io-ts` on the fetch will result in the most efficient use of time.

For the database, I don’t want to have to traverse the json or csv file every time I make a query so I think to make things a little easier in building richer features would be to first seed this data into a SQLlite database and use Prisma and ORM for safely fetching it. This will also add some super powerful features from SQL for aggregation and simple text search.

### The Dashboard

Since the API will use Next.JS, building the rest of the app makes sense here. Normally I wouldn’t even need the API as I can just use SSR to fetch the data directly from the database, but for this example I’ll make sure data is coming specifically though a fetch to the `localhost:3000`.

Will of course be using Typescript as well as `fp-ts` and `io-ts` to handle safe returning of data. For the styling I’ll try keep it simple with Material UI and Emotion though I know this will add a bit to the bundle size in the end.

Finally with the release of Next.JS 13 last week I’ve been itching for a chance to test out the new routing API and `/app` directory. Though these are still in beta I would love to give them a try in this project just to boost performance through Server Components

I don’t think I’ll have time to add any D3 charts, but if I can squeeze something in then I will try.

## The Plan

To make best use of my time I’m going to split the assignment up into the following blocks:

| Time  | Topic                 | Tasks           |
| ----- | --------------------- | --------------- |
| 10:00 | Thoughts and Planning | [x] Assisgnment |

[x] Planning
[x] Data |
| 10:30 | Setup Repo and Deployment | [x] create next.js app
[x] add prisma
[x] add material ui
[x] add fp-ts and io-ts |
| 10:45 | Explore Dataset | [x] using R, explore data
[x] make notes on structure
[x] map data to schema |
| 11:30 | Setup API and Seed Database | [x] create query endpoint
[x] create detail endpoint
[x] seed database with data |
| 12:00 | [LUNCH] | |
| 13:00 | Build Dashboard | [x] create layout
[x] search input
[x] search results
[x] detail page
[?] params and query data |
| 14:00 | Build API functionality | [-] pagination (?)
[x] text search (?)
[-] filter by type (?) |
| 15:00 | Data Fetching and Types | [x] functional fetch with type
[-] fetch more with pagination (?) |
| 16:30 | Troubleshooting and Bonus Points | [x] prod returning 500
[x] SQLLite not supported in edge
[?] add fullText search |
| 17:00 | Deploy | [x] deploy on Vercel
[x] test live version |

## The Dataset

For the dataset, I’m going to use the Baumkataster. I have a bit of history with this dataset and was quite defeated by it when I first joined IxT. I would love to show off not only my improved development skills, but also data science skills. I know the dataset it large so conventional approached don’t work for quickly searching or parsing the data which makes building an API where the heavy lifting is done through SQL and aggregation so much nicer.

---

## Setup Repo and Deployment

- setup `npx create-next-app` with a mono repo
  - [x] yarn dev
  - [x] yarn build
  - [x] add experimental appDir
- Added folder for data
- built, published and deployed to Vercel
  [](https://baumkataster-explorer.vercel.app/)
  - Page works
  - API works

## Exploring the Dataset

I’ve built an `explor.r` in the dataset folder to help explore the 77,016 rows of data.

- can see there are 18 properties
- mostly string, but some are arrays of coord points and many look like enums or categories

Looking at the metadata there is much more info on what each field means

| Name           | Field             | type    | description                                                                                                                                                                                                                                                                                                    |
| -------------- | ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID             | poi_id            | STRING  | Identification number for Züriplan "bm\_" + OBJID                                                                                                                                                                                                                                                              |
| Category       | kategorie         | STRING  | "Strasssenbaum": Attribute 'STATUS', values'Street tree' + 'Street tree (A)'."Grünanlage": Attribute 'STATUS', value'Green space’                                                                                                                                                                              |
| Quarter        | quartier          | STRING  |                                                                                                                                                                                                                                                                                                                |
| Address        | strasse           | STRING  |                                                                                                                                                                                                                                                                                                                |
| Genus          | baumgattunglat    | STRING  |                                                                                                                                                                                                                                                                                                                |
| Species        | baumartlat        | STRING  |                                                                                                                                                                                                                                                                                                                |
| LatinName      | baumnamelat       | STRING  |                                                                                                                                                                                                                                                                                                                |
| GermanName     | baumnamedeu       | STRING  |                                                                                                                                                                                                                                                                                                                |
| TreeNumber     | baumnummer        | STRING  |                                                                                                                                                                                                                                                                                                                |
| Status         | status            | STRING  | Strassenbaum: Tree that is completely Street space stands Strassenbaum (A): Tree in a Green space, which will define the street space co-designed Grünanlage: Tree in a green space (important: not all green space trees are recorded) Bund: Trees growing on properties in the Property of the Confederation |
| Type           | baumtyp           | STRING  |                                                                                                                                                                                                                                                                                                                |
| TypeText       | baumtyptext       | STRING  |                                                                                                                                                                                                                                                                                                                |
| PlantedYear    | pflanzjahr        | STRING  | Year in which the tree was planted. Is not known for all trees.                                                                                                                                                                                                                                                |
| Source         | genauigkeit       | STRING  |                                                                                                                                                                                                                                                                                                                |
| Crown diameter | kronendurchmesser | INTEGER | Crown diameter in m. The no Crown diameters in the tree cadastre are incomplete, become irregular and are only estimates. At Trees for which no crown diameters is available, a diameter of 8m used.                                                                                                           |

## Setup API and Seed Database

in Prisma created a schema for the database

```
model Tree {
  id String @id
  category String
  address String?
  quarter String
  species String
  genus String
  name_lat String
  name_german String
  tree_number String
  status String
  type Int?
  year DateTime?
  source String?
  crown Int
}
```

used [https://transform.tools/json-to-typescript](https://transform.tools/json-to-typescript) to generate the types for seeding the data

There are some issues with seeding the data

- SQLLite was timing out on connections when seeding the database
- Added a catch to retry the connection but with a different instance of prisma
- And another one just in case
- The function is super slow, taking around 20min to add 10,000 entries. but nothing is failing so 🤞
- Taking too long, ended up using DBeaver instead to insert the .csv data

Behind schedule, need to quickly get an API running and tested in prod and can then move onto building the UI

## Build Dashboard

The appDir was a bad idea, too many issues to solve and not my normal workflow. Will adapt back to the pages dir

## Data Fetching and Types

finally got the api to return data from the database, there was an silly bug with fetching data off the [localhost](http://localhost) as https://

## Troubleshooting and Bonus Points

While it was working at some point, once deployed to vercel all the database connections started returning 500. After some digging this seems like an issue with serverless functions where SQLlite is not supported because it is a file based database (torn up and down each time)

- alternative is to use a MySQL database somewhere? Digital Ocean?
- Can keep everything in the domain the same, only changing data source

Next issue is that while the MySQL database works and gives some new and exciting features, attaching it to vercel is having the same issue.

- looking into Data Proxy as an edge solution for connecting to the prisma client
- edge connection is working, but need to set the production database to the actual url and not localhost:3000. unsure why local doesn’t work 🤷

## Wrapup

While the production version is functional as a search for the database, either by the `name_lat` or by the `quarter` there is still a lot of functionality that is missing that I would still like to add.

- The search api was designed to be able to take in more fields for query and filtering, but only fullText search is possible
- Pagination was needed to be skipped for time sake, resulting in hardcoded 50 limit, could have preferred at least offset pagination
- Aggregation is completely missing, would have loved to build a little chart showing how much data was filtered or aggregated using the api for the heavy lifting
- Similar details could have been included in the detail api such as a list of similar trees or other nearby trees?
- Functional error handeling through some kind of failure type is missing, resulting in some gross null checking for states in the SearchBar. Would prefer to return some kind of union type from the API which can be handled in the UI (graphQL would have make this easier)