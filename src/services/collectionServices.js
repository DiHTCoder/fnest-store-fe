import axiosClient from '../utils/axiosClient';

const collectionServices = {
    getAllCollections() {
        const url = '/collection';
        return axiosClient.get(url);
    },
    getCollectionById(id) {
        const url = `/collection/${id}`;
        return axiosClient.get(url);
    },
};

export default collectionServices;
