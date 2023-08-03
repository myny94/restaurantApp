
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/typeDefs.ts",
  documents: null,
  generates: {
    "./src/generated/gql-types.d.ts": {
      plugins: ["typescript"]
    }
  }
};

export default config;
