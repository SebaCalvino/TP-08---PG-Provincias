import express from 'express'
import ProvinceService from '../services/services-province.js'

const router = express.Router();
const service = new ProvinceService();

// GET /api/province - retorna todas las provincias
router.get('/', async (req,res)=>{
	try{
		const items = await service.getAllAsync();
		res.status(200).json(items);
	}catch(err){
		res.status(500).send(err.message || 'Error interno');
	}
});

// GET /api/province/:id - retorna una provincia por id
router.get('/:id', async (req,res)=>{
	try{
		const id = parseInt(req.params.id);
		const item = await service.getByIdAsync(id);
		if (!item) return res.status(404).send('Not Found');
		res.status(200).json(item);
	}catch(err){
		res.status(500).send(err.message || 'Error interno');
	}
});

// POST /api/province - insertar
router.post('/', async (req,res)=>{
	try{
		const entity = req.body;
		const created = await service.insertAsync(entity);
		res.status(201).json(created);
	}catch(err){
		res.status(400).send(err.message || 'Bad request');
	}
});

// PUT /api/province - actualizar
router.put('/', async (req,res)=>{
	try{
		const entity = req.body;
		const updated = await service.updateAsync(entity);
		if (!updated) return res.status(404).send('Not Found');
		res.status(201).json(updated);
	}catch(err){
		if (err.message && (err.message.includes('Falta el id') || err.message.includes('No'))) {
			return res.status(404).send(err.message);
		}
		res.status(400).send(err.message || 'Bad request');
	}
});

// DELETE /api/province/:id - eliminar
router.delete('/:id', async (req,res)=>{
	try{
		const id = parseInt(req.params.id);
		const ok = await service.deleteAsync(id);
		if (!ok) return res.status(404).send('Not Found');
		res.status(200).send('OK');
	}catch(err){
		res.status(500).send(err.message || 'Error interno');
	}
});

export default router;

