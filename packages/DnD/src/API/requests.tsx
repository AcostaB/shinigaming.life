import axios from 'axios';

export const api = {
    getAllItems: () => axios.get("/item"),

    createAnItem: (data) => axios.post("/item/" + data.id, {
        name: data.name,
        description: data.description,
        quantity: data.quantity
    }),

    updateAnItem: (data) => axios.put("/item/" + data.id, {
        name: data.name,
        description: data.description,
        quantity: data.quantity
    }),

    deleteAnItem: (data) => axios.delete("/item/" + data.id),
};