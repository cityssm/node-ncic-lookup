import cityssmConfig, { cspellWords } from 'eslint-config-cityssm';
import tseslint from 'typescript-eslint';
export const config = tseslint.config(...cityssmConfig, {
    rules: {
        '@cspell/spellchecker': [
            'warn',
            {
                cspell: {
                    words: [
                        ...cspellWords,
                        'ncic',
                        'nhtsa'
                    ]
                }
            }
        ]
    }
});
export default config;
