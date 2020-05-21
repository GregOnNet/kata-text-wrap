module.exports = {
  name: 'text-break',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/text-break',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
