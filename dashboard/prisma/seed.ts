import { PrismaClient } from '@prisma/client';
import data from '../../dataset/gsz.baumkataster_baumstandorte.json';

interface Root {
  type: string;
  name: string;
  features: Feature[];
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  objid: string;
  poi_id: string;
  kategorie: string;
  quartier: string;
  strasse?: string;
  baumgattunglat: string;
  baumartlat?: string;
  baumnamelat: string;
  baumnamedeu: string;
  baumnummer: string;
  status: string;
  baumtyp?: string;
  baumtyptext: string;
  pflanzjahr?: string;
  genauigkeit: string;
  kronendurchmesser: number;
}

const prisma = new PrismaClient();
const retry = new PrismaClient();
const retryAgain = new PrismaClient();

const main = async () => {
  const json = data as Root;

  json.features.map(async (t) => {
    const data = {
      category: t.properties.kategorie,
      crown: t.properties.kronendurchmesser,
      genus: t.properties.baumgattunglat,
      species: t.properties.baumartlat,
      id: t.properties.poi_id,
      name_german: t.properties.baumnamedeu,
      name_lat: t.properties.baumnamelat,
      quarter: t.properties.quartier,
      status: t.properties.status,
      tree_number: t.properties.baumnummer,
      address: t.properties.strasse,
      source: t.properties.genauigkeit,
      type: t.properties.baumtyp ? +t.properties.baumtyp : undefined,
      year: t.properties.pflanzjahr ? +t.properties.pflanzjahr : undefined,
      geo_lat: t.geometry.coordinates[0],
      geo_long: t.geometry.coordinates[1],
    };
    try {
      await prisma.tree.create({
        data,
      });
    } catch (err) {
      try {
        await retry.tree.create({
          data,
        });
      } catch (err) {
        try {
          await retryAgain.tree.create({
            data,
          });
        } catch (err) {
          console.log(t.properties.poi_id);
        }
      }
    }
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
    await retry.$disconnect();
    await retryAgain.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await retry.$disconnect();
    await retryAgain.$disconnect();
    process.exit(1);
  });
