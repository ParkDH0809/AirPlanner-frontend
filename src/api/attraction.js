import attraction_instance from "./attractionInstance.js";

async function getAttractionInfo(data, success, fail) {
  try {
    const response = await attraction_instance.get("/detailIntro1" + data);
    success(response);
  } catch (error) {
    fail(error);
  }
}
async function getAttractionCommonInfo(data, success, fail) {
  try {
    const response = await attraction_instance.get("/detailCommon1" + data);
    success(response);
  } catch (error) {
    fail(error);
  }
}

export { getAttractionInfo, getAttractionCommonInfo };
