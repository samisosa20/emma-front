import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:3002/docs/json",
      filters: {
        mode: "exclude",
        tags: ["Default", "Example"],
      },
      override: {
        transformer: (specs) => {
          const paths = specs.paths;
          const newPaths: typeof paths = {};

          Object.keys(paths).forEach((key) => {
            const newKey = key.replace(/^\/api\/v2/, '/api');
            newPaths[newKey] = paths[key];
          });

          return {
            ...specs,
            paths: newPaths,
          };
        },
      },
    },
    output: {
      mode: "tags-split",
      target: `./shared/endpoints/endpointsFileSpec.ts`,
      schemas: `./shared/domain/models`,
      client: "react-query",
      prettier: true,
      tslint: true,
      tsconfig: "../../tsconfig.json",
      override: {
        mutator: {
          path: "./lib/api-client/api-client.ts",
          name: "apiClient",
        },
        query: {
          useSuspenseQuery: true,
          useQuery: true,
        },
      },
    },
  },
});