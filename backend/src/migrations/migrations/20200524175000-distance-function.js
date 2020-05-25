'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.createFunction(
      'distance',
      [
        { type: 'varchar', name: 'lat1', direction: 'IN' },
        { type: 'varchar', name: 'lon1', direction: 'IN' },
        { type: 'varchar', name: 'lat2', direction: 'IN' },
        { type: 'varchar', name: 'lon2', direction: 'IN' }
      ],
      'decimal',
      'plpgsql',
      'RETURN ACOS(SIN(PI()*CAST(lat1 AS DECIMAL)/180.0)*SIN(PI()*CAST(lat2 AS DECIMAL)/180.0)+COS(PI()*CAST(lat1 AS DECIMAL)/180.0)*COS(PI()*CAST(lat2 AS DECIMAL)/180.0)*COS(PI()*CAST(lon2 AS DECIMAL)/180.0-PI()*CAST(lon1 AS DECIMAL)/180.0))*6371*1000;',
      ['IMMUTABLE', 'LEAKPROOF']
    ),
  down: queryInterface =>
    queryInterface.dropFunction('distance', [
      { type: 'varchar', name: 'lat1', direction: 'IN' },
      { type: 'varchar', name: 'lon1', direction: 'IN' },
      { type: 'varchar', name: 'lat2', direction: 'IN' },
      { type: 'varchar', name: 'lon2', direction: 'IN' }
    ])
};
