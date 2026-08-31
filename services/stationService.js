// Import the station model, to do our database operations, duh..
import Station from "../models/Station.js";


// Find and arrange stations
export async function findAndArrangeStations() {
	return await Station.find().sort({ line: 1, order: 1 });
}

// Add multiple stations at once (for initial setup)
export async function seedStations(stationsArray) {
  // Create operations to update or insert each station
  const operations = stationsArray.map((station) => ({
    updateOne: {
      filter: { id: station.id },
      update: { $set: station },
      upsert: true, // Create if doesn't exist
    },
  }));

  // Execute all operations at once
  return await Station.bulkWrite(operations);
}
