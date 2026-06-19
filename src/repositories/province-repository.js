import pkg from 'pg';
import LogHelper from './../helpers/validaciones-helper.js';
import DBConfig  from './../configs/db-config.js';

const { Pool } = pkg;

export default class ProvinceRepository {

    constructor() {
        console.log('Estoy en: ProvinceRepository.constructor()');
        this.DBPool = null;
    }

    getDBPool = () => {
        if (this.DBPool == null) {
            this.DBPool = new Pool(DBConfig);
        }
        return this.DBPool;
    }

    getAllAsync = async () => {
        console.log(`ProvinceRepository.getAllAsync()`);
        let returnArray = null;

        try {
            const sql      = `SELECT * FROM provincias ORDER BY display_order`;
            const resultPg = await this.getDBPool().query(sql);
            returnArray    = resultPg.rows;
        } catch (error) {
            LogHelper.logError(error);
        }

        return returnArray;
    }

    getByIdAsync = async (id) => {
        console.log(`ProvinceRepository.getByIdAsync(${id})`);
        let returnEntity = null;

        try {
            const sql      = `SELECT * FROM provincias WHERE id=$1`;
            const values   = [id];
            const resultPg = await this.getDBPool().query(sql, values);
            if (resultPg.rows.length > 0) {
                returnEntity = resultPg.rows[0];
            }
        } catch (error) {
            LogHelper.logError(error);
        }

        return returnEntity;
    }

    createAsync = async (entity) => {
        console.log(`ProvinceRepository.createAsync(${JSON.stringify(entity)})`);
        let newId = 0;

        try {
            const sql = `INSERT INTO provincias (name, full_name, latitude, longitude, display_order)
                         VALUES ($1, $2, $3, $4, $5) RETURNING id`;
            const values = [
                entity?.name          ?? '',
                entity?.full_name     ?? '',
                entity?.latitude      ?? null,
                entity?.longitude     ?? null,
                entity?.display_order ?? null
            ];
            const resultPg = await this.getDBPool().query(sql, values);
            newId = resultPg.rows[0].id;
        } catch (error) {
            LogHelper.logError(error);
        }

        return newId;
    }

    updateAsync = async (entity) => {
        console.log(`ProvinceRepository.updateAsync(${JSON.stringify(entity)})`);
        let rowsAffected = 0;
        const id = entity.id;

        try {
            const previousEntity = await this.getByIdAsync(id);
            if (previousEntity == null) return 0;

            const sql = `UPDATE provincias SET
                            name          = $2,
                            full_name     = $3,
                            latitude      = $4,
                            longitude     = $5,
                            display_order = $6
                         WHERE id = $1`;
            const values = [
                id,
                entity?.name          ?? previousEntity?.name,
                entity?.full_name     ?? previousEntity?.full_name,
                entity?.latitude      ?? previousEntity?.latitude,
                entity?.longitude     ?? previousEntity?.longitude,
                entity?.display_order ?? previousEntity?.display_order
            ];
            const resultPg = await this.getDBPool().query(sql, values);
            rowsAffected = resultPg.rowCount;
        } catch (error) {
            LogHelper.logError(error);
        }

        return rowsAffected;
    }

    deleteByIdAsync = async (id) => {
        console.log(`ProvinceRepository.deleteByIdAsync(${id})`);
        let rowsAffected = 0;

        try {
            const sql      = `DELETE FROM provincias WHERE id=$1`;
            const values   = [id];
            const resultPg = await this.getDBPool().query(sql, values);
            rowsAffected   = resultPg.rowCount;
        } catch (error) {
            LogHelper.logError(error);
        }

        return rowsAffected;
    }
}
