setTimeout(() => {
  throw new Error('Opps');
}, 300);

process.on('uncaughtException', () => {

});

process.on('unhandleRejection', () => {
  
});