import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';

const jestConfig = async (): Promise<Config> => ({
  projects: await getJestProjectsAsync()
});

export default jestConfig;
