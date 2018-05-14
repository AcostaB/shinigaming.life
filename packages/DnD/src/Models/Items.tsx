export interface Item {
    _id: number,
    name: string,
    description: string,
    quantity: number
}

export const items: Item[] = [
    {
        _id: 1,
        name: "Herb root",
        description: "Cures poison",
        quantity: 3
    },
    {
        _id: 2,
        name: "Colorful feathers",
        description: "Feathers found in a cave",
        quantity: 9
    },
    {
        _id: 3,
        name: "Light nuts",
        description: "When shaken, light up.",
        quantity: 3
    },
    {
        _id: 4,
        name: "Monkey fruit",
        description: "",
        quantity: 2
    },
    {
        _id: 5,
        name: "Quiver",
        description: "Holds arrows.",
        quantity: 1
    },
    {
        _id: 6,
        name: "Arrows",
        description: "",
        quantity: 14
    },
    {
        _id: 7,
        name: "Potion of underwater breathing",
        description: "",
        quantity: 1
    },
    {
        _id: 8,
        name: "Potion of greater healing",
        description: "",
        quantity: 1
    }
  ]