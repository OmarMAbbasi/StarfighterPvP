const PowerUps = {};

PowerUps.shotgun = {
    type: 'WEAPON',
    name: 'Shotgun',
    options: {
        type: 'SHOTGUN',
        fireRate: 2.5,
        damage: 12,
        bulletSize: 5
    }
};

PowerUps.speedyBullets = {
    type: 'WEAPON',
    name: 'Speedy Bullets',
    options: {
        type: 'SPEEDYBULLETS',
        bulletSpeed: 1200
    }
};

PowerUps.fatman = {
    type: 'WEAPON',
    name: 'Fatman',
    options: {
        type: 'FATMAN',
        damage: 70,
        bulletSize: 15,
        bulletSpeed: 450
    }
};

// PowerUps.doubleDamage = {
//     type: 'WEAPON',
//     name: 'Double Damage',
//     options: {
//         type: 'DOUBLEDAMAGE',
//         damage: 70
//     }
// };

PowerUps.backshot = {
    type: 'WEAPON',
    name: 'Backshot',
    options: {
        type: 'BACKSHOT'
    }
};

PowerUps.sideshot = {
    type: 'WEAPON',
    name: 'Sideshot',
    options: {
        type: 'SIDESHOT'
    }
};

PowerUps.uzi = {
    type: 'WEAPON',
    name: 'Uzi',
    options: {
        type: 'UZI',
        fireRate: 7
    }
};

module.exports = PowerUps;