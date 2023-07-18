const fs = require("fs");

const districts = fs.readFileSync("List_of_districts_in_Malaysia.json", "utf8");
const johor = fs.readFileSync("johor.json", "utf8");
const all = fs.readFileSync("all.geojson", "utf8");

// const districtsJSON = JSON.parse(districts);
const johorJSON = JSON.parse(johor);
const johorDistricts = johorJSON.map((d) => d.districtName);

const allJSON = JSON.parse(all);
const allDisctricts = allJSON.features.map((d) => d);

let matchingDistricts = [];

allDisctricts.forEach((district, i) => {
  const withSuffix = district.properties.shapeName + " District";
  if (johorDistricts.includes(withSuffix)) {
    matchingDistricts.push(district);
  }
});

const geoJSON = {
  type: "FeatureCollection",
  features: matchingDistricts,
};

fs.writeFileSync("johor.geo.json", JSON.stringify(geoJSON));
