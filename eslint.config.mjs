import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-img-element": "off", // 🚀 <img> 태그 허용
      "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 변수 허용
      "no-unused-vars": "off", // 사용하지 않는 변수 허용
    },
  },
];

export default eslintConfig;
