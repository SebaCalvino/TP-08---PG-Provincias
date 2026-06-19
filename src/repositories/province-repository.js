// Simple in-memory repository to satisfy endpoints during development.
// Replace with real DB implementation when ready.

export default class ProvinceRepository {

    constructor(){
        this._data = [
            { id: 1, name: 'Buenos Aires', full_name: 'Provincia de Buenos Aires', latitude: -34.6037, longitude: -58.3816, display_order: 1 },
            { id: 2, name: 'Córdoba', full_name: 'Provincia de Córdoba', latitude: -31.4167, longitude: -64.1833, display_order: 2 }
        ];
        this._nextId = 3;
    }

    getAllAsync = async () => {
        return [...this._data];
    }

    getByIdAsync = async (id) => {
        const i = this._data.findIndex(p => p.id === id);
        return i === -1 ? null : { ...this._data[i] };
    }

    insertAsync = async (entity) => {
        const newEntity = { ...entity, id: this._nextId++ };
        this._data.push(newEntity);
        return newEntity;
    }

    updateAsync = async (entity) => {
        const i = this._data.findIndex(p => p.id === entity.id);
        if (i === -1) return null;
        this._data[i] = { ...this._data[i], ...entity };
        return { ...this._data[i] };
    }

    deleteAsync = async (id) => {
        const i = this._data.findIndex(p => p.id === id);
        if (i === -1) return false;
        this._data.splice(i,1);
        return true;
    }

}
