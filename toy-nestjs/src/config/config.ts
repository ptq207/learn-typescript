import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import path from 'path';

export default () => {
	return yaml.load(
		readFileSync(path.join(__dirname, `config.${process.env.NODE_ENV}.yaml`), 'utf-8')
	) as Record<string, any>
}