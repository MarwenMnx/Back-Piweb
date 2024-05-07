import Consomglobal from "./server/models/Consomglobal.js";

export const startSocketLogic = (io) => {
  io.on('connection', (socket) => {
    

    // Emit data every second
    setInterval(async () => {
      try {
        const latestData = await Consomglobal.findOne({}, {}, { sort: { 'date': -1, '_id': -1 } }).exec(); // Fetch the latest data from MongoDB
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
          } = latestData;

          // Emit all attributes
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
          });
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 1000);

    // Disconnect event
    socket.on('disconnect', () => {
      
    });
  });
};
