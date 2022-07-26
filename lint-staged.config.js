module.exports = {
  '*.ts': () => [
    'npm run format',
    'npm run lint',
    'npm run type-check',
    'npm run test',
  ],
}
