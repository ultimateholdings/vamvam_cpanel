import { json } from "react-router-dom";
import { getSettingsData } from "./http";

async function loadSettings() {
  try {
    const data = await getSettingsData();
    return data;
  } catch (error: any) {
    throw json({ message: error.message }, { status: 500 });
  }
}

export { loadSettings };
