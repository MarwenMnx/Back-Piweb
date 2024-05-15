import AirConsomglobal from "./models/AirConsomglobal.js";

export const initializeSocketLogic = (io) => {
  io.on('connection', (socket) => {
    let interval;

    socket.on('disconnect', () => {
      clearInterval(interval);
    });

    // Emit data every second
    interval = setInterval(async () => {
      try {
        const latestData = await AirConsomglobal.findOne({}, {}, { sort: { 'date': -1, '_id': -1 } }).exec();
        if (latestData) {
          const {
            local_id,
            pression_1,
            heurefonction,
            pression_2,
            temperature,
            pointderose,
            tauxdecharge,
            debit,
            production,
            date,
            heure,
            productionpression,
            energie_1,
            energie_2,
            energie_3,
          } = latestData;

          socket.emit('consomglobal', {
            local_id,
            pression_1,
            heurefonction,
            pression_2,
            temperature,
            pointderose,
            tauxdecharge,
            debit,
            production,
            date,
            heure,
            productionpression,
            energie_1,
            energie_2,
            energie_3,
          });
        } else {
          // Handle no data case
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 1000);
  });
};