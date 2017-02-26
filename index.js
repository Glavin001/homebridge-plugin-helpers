
class Accessory {

	static register(homebridge) {
		homebridge.registerAccessory(this.pluginName, this.accessoryName, this.accessory(homebridge).bind(this));
	}

	static get pluginName() {
        throw new Error("Accessory static getter 'pluginName' not implemented.");
	}
	
	static get accessoryName() {
        throw new Error("Accessory static getter 'accessoryName' not implemented.");
	}

	static accessory(homebridge) {
		const constructor = this;
		return function (log, config, api) {
			return new constructor(homebridge, log, config, api);
		}
	}

	getInformationService() {
		const { Service, Characteristic } = this;
		var informationService = new Service.AccessoryInformation();
		informationService
			.setCharacteristic(Characteristic.Name, this.name)
			.setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
			.setCharacteristic(Characteristic.Model, this.model)
			.setCharacteristic(Characteristic.SerialNumber, this.serialNumber);
		return informationService;
	}

	get manufacturer() {
        throw new Error("Accessory getter 'manufacturer' not implemented.");
	}

	get model() {
        throw new Error("Accessory getter 'model' not implemented.");
	}

	get serialNumber() {
        throw new Error("Accessory getter 'serialNumber' not implemented.");
	}

	getServices() {
        const { service } = this;
        const { accessoryName } = this.constructor;
        if (!service) {
            throw new Error(`Service not found for ${accessoryName} Accessory.`);
        }
		return [service, this.getInformationService()];
	}

    constructor() {
    }

}

module.exports = {
    Accessory,
};