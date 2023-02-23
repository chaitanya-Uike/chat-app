const AssetList = require("./assetList");

module.exports = function generateAvatar() {
  const index = Math.floor(Math.random() * AssetList.length);
  return AssetList[index];
};
