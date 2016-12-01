function CustomComboSelect(config) {
	this.element = document.querySelector(config.selector);

	// important sa fie de aceasi lungime
	this.data = config.data;
	this.UIdata = config.UIdata || this.data;

	var me = this;

	this.___ONCHANGE_SELECT = function () {
		me.onSelectChange.apply(me, arguments);
	};

	this.___ONCLICK_ADD_BUTTON = function () {
		me.onAddButtonClick.apply(me, arguments);
	}
	this.___ONCLICK_SEND_BUTTON = function () {
		me.onSendButtonClick.apply(me, arguments);
	}

	this.intialize();
	this.prePopulate(config.defaultSelected);
}

CustomComboSelect.prototype.intialize = function () {
	//creating add button
	var addButton = document.createElement('div');
	var sendButton = document.createElement('div');
	var me = this;

	addButton.classList.add('add-button');
	sendButton.classList.add('send-button');
	addButton.innerHTML='+';
	sendButton.innerHTML='Cauta';
	addButton.addEventListener('click', this.___ONCLICK_ADD_BUTTON);
	sendButton.addEventListener('click', this.___ONCLICK_SEND_BUTTON);
	this.element.appendChild(addButton);
	this.element.appendChild(sendButton);
	this._addButton = addButton;
	this._sendButton = sendButton;
};

CustomComboSelect.prototype.onAddButtonClick = function (e) {
	this.addSelect();
};

CustomComboSelect.prototype.addSelect = function(value) {
	var newSelect = document.createElement('select');
	var data = this.populateSelect();

	newSelect.classList.add('select');
	newSelect.innerHTML = data;
	newSelect.addEventListener('change', this.___ONCHANGE_SELECT);
	this.element.insertBefore(newSelect,this._addButton);

	this._selects = this._selects || [];
	this._selects.push(newSelect);

	if (value)
		newSelect.value = value;

	this.filterSelects();


};

CustomComboSelect.prototype.populateSelect = function () {

	var options = [];
	var data = this.data;
	var UIdata = this.UIdata;
	options.push('<option disabled="" value="" selected="">neselectat</option>');

for(var d = 0, dln= data.length; d < dln; d++) {
		options.push('<option value ="', data[d], '">', UIdata[d], '</option>');
	}

	options.push('<option value="__delete__" default>Serge-ma</option>');
	return options.join('');
};

CustomComboSelect.prototype.onSelectChange = function (e) {
	// aici stergem selectu daca contine value="delete"
	var target = e.target;
	var selects = this._selects;


	if (target.value == "__delete__") {
		for (var i = 0; i < selects.length; i++) {
			if (selects[i] === target) {
				selects.splice(i,1);
				i = i - 1;
			}
		}
		this.element.removeChild(target);
		target.removeEventListener('change', this.___ONCHANGE_SELECT);
	}

	this.filterSelects();
};

CustomComboSelect.prototype.filterSelects = function () {
	var selects = this._selects;
	var data = this.data;
	var selectedData = this.getValues();

	for (var s2 = 0; s2 < selects.length; s2++) {
		var options = selects[s2].querySelectorAll('option');
		var currentValueSelected = selects[s2].value;

		for (var i = 0; i < options.length; i++) {
			if (selectedData.indexOf(options[i].value) > -1 && options[i].value != currentValueSelected)
				options[i].setAttribute('disabled','');
			else
				options[i].removeAttribute('disabled');
		}
	}
};

CustomComboSelect.prototype.getValues = function () {
	var selects = this._selects;
	var selectedData = [];

	for (var s1 = 0; s1 < selects.length; s1++) {
		if (selects[s1].value != "" && selects[s1].value != "__delete__")
			selectedData.push(selects[s1].value)
	}

	return selectedData;
};

CustomComboSelect.prototype.onSendButtonClick = function () {
	// aici se face requestul
	var json = JSON.stringify(this.getValues());

	debugger;
};

CustomComboSelect.prototype.prePopulate = function(defaultSelected) {
	for (var i =0; i< defaultSelected.length;i++) {
		this.addSelect(defaultSelected[i]);
	}
};

//pre-populare cu selecturi


window['CCC_ALIN'] = new CustomComboSelect({
	'selector': '#divuMeu',
	'data': ['ceapa','castravetzi','sare','zahar','piper'],
	'UIdata': ['ce4p4','c4str4vetzi','s4re','z4har','p1per'],
	'defaultSelected': ['sare','zahar','piper']
});
