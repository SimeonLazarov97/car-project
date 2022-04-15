import { Association, DataTypes, Model, Sequelize } from 'sequelize'
import Region from './region';

class Car extends Model {
  public id!: number
  public brand!: string
  public createdAt!: Date;
  public regionId!: number;

  public static associations: {
    Classes: Association<Car, Region>
  }

  public static initialize(sequelize: Sequelize) {
    this.init({
      brand: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    }, { sequelize: sequelize, updatedAt: false })
  }
}

export default Car