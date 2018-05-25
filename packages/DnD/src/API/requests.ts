import axios from 'axios';
import {Item} from '../Models/Items';


export const api = {
    getAllItems: () => axios.get("/item"),

    createAnItem: (data: Item) => axios.post("/item/" + data._id, {
        name: data.name,
        description: data.description,
        quantity: data.quantity
    }),

    updateAnItem: (data: Item) => axios.put("/item/" + data._id, {
        name: data.name,
        description: data.description,
        quantity: data.quantity
    }),

    deleteAnItem: (data: Item) => axios.delete("/item/" + data._id),
};