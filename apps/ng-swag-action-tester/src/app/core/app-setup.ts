import { ISwagBasicSetupConfig } from '@simple-web-app-generator/client/basic';

export const config: ISwagBasicSetupConfig = {
  services: {
    visit: {
      config: {
        server: {
          setUp: {
            root: 'http://localhost:3333/api/visit',
            data: {
              path: '',
              requiredHeaders: {},
              protectedPath: false
            },
            run: {
              path: '',
              requiredHeaders: {},
              protectedPath: false
            },
            update: {
              path: '/update-paths',
              requiredHeaders: {},
              protectedPath: false,
              query:{
                test : 1,
                test2: 2,
                test3: 'This is my query damn it'
              }
            }
          },
          update: {
            root: 'http://localhost:3333/api/visit',
            run: {
              path: '',
              requiredHeaders: {},
              protectedPath: false
            }
          }
        },
        data: {
          test: 'does this work?'
        },
        persistent: {}
      }
    },
    rules: {
      config: {
        rulesTypeMap: {}
      }
    }
  }
};
