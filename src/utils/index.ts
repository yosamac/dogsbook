
// Estas funciones aumenta el consumo de memoria, debido a las instancia 
// de Promise creadas cada vez que ejecutamos las funciones y 
// se puede llegar a tener el error: Nodejs heap out of memory.
// Recomiendo usar el metodo estatico Promise.resolve, sin crear instancias.

export const isSouthOrNorth = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (latitude >= 0 && latitude <= 90
        && longitude >= -180 && longitude <= 180) {
        resolve('N');
      } else if (latitude < 0 && latitude >= -90
        && longitude >= -180 && longitude <= 180){
        resolve('S');
      } else {
        reject(new Error('Bad values'));
      }
    }, 700);
  });
};

export const processSouthern = (data) => { return new Promise((resolve, reject) => {
  setTimeout(() => { resolve(); },1000);
});
};