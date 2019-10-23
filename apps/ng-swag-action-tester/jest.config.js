module.exports = {
  name: 'ng-swag-action-tester',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-swag-action-tester',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
