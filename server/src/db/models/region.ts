import { Association, DataTypes, Model, Sequelize } from 'sequelize'

class Region extends Model {
  public id!: number
  public name!: string
  public createdAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    }, { sequelize: sequelize, updatedAt: false })
  }
}

export default Region