import axiosClient from '../utils/axiosClient';

const roomServices = {
    getAllRooms() {
        const url = '/room';
        return axiosClient.get(url);
    },
    getRoomById(id) {
        const url = `/room/${id}`;
        return axiosClient.get(url);
    },
    getCategoryByRoomId(id) {
        const url = '/category/by-room?id=' + id;
        return axiosClient.get(url);
    },
};

export default roomServices;
