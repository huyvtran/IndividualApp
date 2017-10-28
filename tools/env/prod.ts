import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: 'https://prod.ols.internal2.eportal.wellpoint.com/solsadmin/senior/admin/'
};

export = ProdConfig;

