'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Accounts extends Model {
		static associate (models) {
		}
	}

	Accounts.init({
		username: { type: DataTypes.STRING, unique: true },
		email: { type: DataTypes.STRING, unique: true },
		phoneNo: { type: DataTypes.STRING, unique: true },
		skillSet: { type: DataTypes.JSON, defaultValue: {} },
		hobbies: { type: DataTypes.JSON, defaultValue: {} },
	}, {
		sequelize,
		modelName: 'Users',
		tableName: 'users',
		paranoid: true
	})

	return Accounts
}
