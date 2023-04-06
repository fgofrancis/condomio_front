// Crear la tabla
const table = {
    header: ['Producto', 'Precio', 'Cantidad', 'Total'],
    body: [
      ['Manzanas', '2.00', '3', '6.00'],
      ['Naranjas', '1.50', '5', '7.50'],
      ['Plátanos', '0.50', '10', '5.00']
    ]
  };
  
  // Calcular totales
  const columnTotals = [0, 0, 0, 0];
  for (let i = 0; i < table.body.length; i++) {
    for (let j = 1; j < table.body[i].length; j++) {
      columnTotals[j] += parseFloat(table.body[i][j]);
    }
  }
  
  // Agregar fila de totales
  const totalRow = [
    { text: 'Totales', bold: true },
    ...columnTotals.map(total => ({
      text: total.toLocaleString('en-ES', { style: 'decimal', currency: 'INR', minimumFractionDigits: 2 }),
      alignment: 'right'
    }))
  ].map(item=>item.text);
  
//   table.body.concat([totalRow]);
//   table.body.push(totalRow);
  table.body = table.body.concat([totalRow]);

  
  // Generar el informe completo
  const docDefinition = {
    content: [
      { text: 'Tabla de productos', style: 'header' },
      { table: table }
    ]
  };
  
  pdfMake.createPdf(docDefinition).open();
  