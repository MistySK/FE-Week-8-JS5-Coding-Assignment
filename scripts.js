
//Bands and musicians in those bands
//Musician class

class Musician {
    constructor (name, role) {
        this.name = name;
        this.role = role;
    }

    describe() {
        return `${this.name} plays ${this.role}.`;
    }
}


//Band class

class Band {
    constructor(name) {
        this.name = name;
        this.musicians = []; //array to hold all of the musicians
    } 

    addMusician(musician) {
        if (musician instanceof Musician) {
            this.musicians.push(musician);
        } else {
            throw new Error(`You can only add an instance of Musician. Argument is not a Musician: ${musician}`);
        }
    }

    describe() {
        return `${this.name} has ${this.musicians.length} musicians.`;
    } 
}


class Menu {
    constructor() {
        this.bands = [];
        this.selectedBand = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create a new band
            2) View a band
            3) Delete a band
            4) Display all bands
        `);
    }

    showBandMenuOptions(bandInfo) {
        return prompt(`
            0) Back
            1) Create musician
            2) Delete musician
            ---------------------
            ${bandInfo}
        `);
    }

    displayBands() {
        let bandString = '';
        for (let i = 0; i < this.bands.length; i++) {
            bandString += i + ') ' + this.bands[i].name + '\n';
        }
        alert(bandString);
    }

    createBand() {
        let name = prompt('Enter name of new band:');
        this.bands.push(new Band(name));
    }

    viewBand() {
        let index = prompt('Enter the index of the band you wish to view:');
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = 'Band Name: ' + this.selectedBand.name + '\n';

            for (let i = 0; i < this.selectedBand.musicians.length; i++) {
                description += i + ') ' + this.selectedBand.musicians[i].name 
                    + ' - ' + this.selectedBand.musicians[i].role + '\n';
            }

            let selection = this.showBandMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createMusician();
                    break;
                case '2':
                    this.deleteMusician();
            }
        }
    }

    deleteBand() {
        let index = prompt('Enter the index of the band you wish to delete:');
        if (index > -1 && index < this.bands.length) {
            this.bands.splice(index, 1);
        }
    }
    
    createMusician() {
        let name = prompt('Enter name of new musician:');
        let role = prompt('Enter role for new musician:');
        this.selectedBand.musicians.push(new Musician(name, role));
    }

    deleteMusician() {
        let index = prompt('Enter the index of the musician you wish to delete:');
        if (index > -1 && index < this.selectedBand.musicians.length) {
            this.selectedBand.musicians.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();



