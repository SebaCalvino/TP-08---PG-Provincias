
import ProvinceRepository from '../repositories/province-repository.js'

const repo = new ProvinceRepository();

export default class ProvinceService {

	getAllAsync = async () => {
		return await repo.getAllAsync();
	}

	getByIdAsync = async (id) => {
		return await repo.getByIdAsync(id);
	}

	validate(entity){
		if (!entity) throw new Error('Entidad vacía');
		if (!entity.name || typeof entity.name !== 'string' || entity.name.trim().length < 3) throw new Error('El nombre debe tener al menos 3 caracteres');
	}

	insertAsync = async (entity) => {
		this.validate(entity);
		return await repo.insertAsync(entity);
	}

	updateAsync = async (entity) => {
		if (!entity || !entity.id) throw new Error('Falta el id para actualizar');
		this.validate(entity);
		const updated = await repo.updateAsync(entity);
		return updated;
	}

	deleteAsync = async (id) => {
		return await repo.deleteAsync(id);
	}

}

