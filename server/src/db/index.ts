import { Sequelize } from 'sequelize';
import Car from './models/car';
import Region from './models/region';

const sequelize = new Sequelize(process.env.DATABASE_URL as string);

let models = [Car, Region];

models.forEach(model => model.initialize(sequelize));

// Associations
Car.belongsTo(Region, { as: 'Region', foreignKey: 'regionId' });
Region.hasMany(Car, { as: 'Car', foreignKey: 'regionId' });

// Create tables
sequelize.sync();

export {
  sequelize,
  Car, Region
};