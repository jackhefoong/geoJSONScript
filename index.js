const fs = require("fs");

const districts = fs.readFileSync("List_of_districts_in_Malaysia.json", "utf8");
const selangor = fs.readFileSync("selangor.json", "utf8");
const all = fs.readFileSync("all.geojson", "utf8");

// const districtsJSON = JSON.parse(districts);
const selangorJSON = JSON.parse(selangor);
const selangorDistricts = selangorJSON.map((d) => d.districtName);

const allJSON = JSON.parse(all);
const allDisctricts = allJSON.features.map((d) => d);

let matchingDistricts = [];

allDisctricts.forEach((district, i) => {
  const withSuffix = district.properties.shapeName + " District";
  if (selangorDistricts.includes(withSuffix)) {
    matchingDistricts.push(district);
  }
});

const geoJSON = {
  type: "FeatureCollection",
  features: matchingDistricts,
};

fs.writeFileSync("selangor.geojson", JSON.stringify(geoJSON));
