import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Article extends Model {
  public id!: number;
  public title!: string;
  public image!: string;
  public content!: string;
  public tags!: string[];
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL-specific type for arrays
      allowNull: false,
    },
  },
  {
    sequelize,
    schema: 'karabo_schema',
    tableName: 'articles',
    modelName:'Articles',
    timestamps: true, // Includes createdAt and updatedAt
  }
);

export default Article;
