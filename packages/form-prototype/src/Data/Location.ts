import { Location } from '../Models/Location'

export const data: Location[] = [
  {
    id: 1,
    locationNum: 1,
    locationName: "Avenger's Compound",
    address: {
      addressID: 1,
      line1: "101 Avenger Lane",
      line2: "",
      city: "EARTH1",
      state: "MCU",
      zip: "27954"
    },
    buildings: [
      {
        buildingID: 1,
        name: "Training Grounds",
        address: {
          addressID: 2,
          line1: "101 Avenger Lane",
          line2: "Train Street",
          city: "EARTH1",
          state: "MCU",
          zip: "27954"
        },
        construction: 'wood',
        website: 'traininggrounds.com',
        apartments: []
      },
      {
        buildingID: 2,
        name: "Residential Building",
        address: {
          addressID: 3,
          line1: "101 Avenger Lane",
          line2: "Sleep Street",
          city: "EARTH1",
          state: "MCU",
          zip: "27954"
        },
        construction: 'concrete',
        website: 'getsomezzz.com',
        apartments: []
      }
    ]
  },
  {
    id: 3,
    locationNum: 3,
    locationName: "Justice League HQ",
    address: {
      addressID: 4,
      line1: "22 Justice Is Served Lane",
      line2: "",
      city: "EARTH33",
      state: "DCU",
      zip: "27954"
    },
    buildings: [
      {
        buildingID: 1,
        name: "Watchtower",
        address: {
          addressID: 5,
          line1: "22 Justice Is Served Lane",
          line2: "12 Watchtower",
          city: "EARTH33",
          state: "DCU",
          zip: "27955"
        },
        construction: 'wood',
        website: 'weseeall.com',
        apartments: []
      }
    ]
  }
];