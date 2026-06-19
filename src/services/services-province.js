import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService {

    constructor() {
        console.log('Estoy en: ProvinceService.constructor()');
        this.ProvinceRepository = new ProvinceRepository();
    }

    getAllAsync = async () => {
        console.log(`ProvinceService.getAllAsync()`);
        const returnArray = await this.ProvinceRepository.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        console.log(`ProvinceService.getByIdAsync(${id})`);
        const returnEntity = await this.ProvinceRepository.getByIdAsync(id);
        return returnEntity;
    }

    createAsync = async (entity) => {
        console.log(`ProvinceService.createAsync(${JSON.stringify(entity)})`);
        const newId = await this.ProvinceRepository.createAsync(entity);
        return newId;
    }

    updateAsync = async (entity) => {
        console.log(`ProvinceService.updateAsync(${JSON.stringify(entity)})`);
        const rowsAffected = await this.ProvinceRepository.updateAsync(entity);
        return rowsAffected;
    }

    deleteByIdAsync = async (id) => {
        console.log(`ProvinceService.deleteByIdAsync(${id})`);
        const rowsAffected = await this.ProvinceRepository.deleteByIdAsync(id);
        return rowsAffected;
    }
}
